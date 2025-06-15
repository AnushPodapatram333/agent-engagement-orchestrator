
// Agent Development Kit Core Framework
export interface ADKAgent {
  id: string;
  name: string;
  type: 'routing' | 'support' | 'sales' | 'escalation' | 'analytics';
  status: 'active' | 'busy' | 'idle' | 'offline';
  capabilities: string[];
  priority: number;
  load: number;
  maxConcurrentTasks: number;
  currentTasks: Task[];
}

export interface Task {
  id: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  payload: any;
  assignedAgent?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  estimatedDuration: number;
  actualDuration?: number;
}

export interface AgentMessage {
  id: string;
  from: string;
  to: string;
  type: 'task_assignment' | 'task_result' | 'status_update' | 'collaboration_request';
  payload: any;
  timestamp: Date;
}

export class ADKCore {
  private agents: Map<string, ADKAgent> = new Map();
  private tasks: Map<string, Task> = new Map();
  private messageQueue: AgentMessage[] = [];
  private subscribers: Map<string, Function[]> = new Map();

  // Agent Registry Management
  registerAgent(agent: ADKAgent): boolean {
    console.log(`[ADK] Registering agent: ${agent.name} (${agent.id})`);
    this.agents.set(agent.id, agent);
    this.emit('agent_registered', agent);
    return true;
  }

  unregisterAgent(agentId: string): boolean {
    const agent = this.agents.get(agentId);
    if (agent) {
      console.log(`[ADK] Unregistering agent: ${agent.name}`);
      this.agents.delete(agentId);
      this.emit('agent_unregistered', agent);
      return true;
    }
    return false;
  }

  // Task Orchestration
  async assignTask(task: Task): Promise<string | null> {
    console.log(`[ADK] Assigning task: ${task.type} (Priority: ${task.priority})`);
    
    const availableAgents = this.findCapableAgents(task);
    const bestAgent = this.selectOptimalAgent(availableAgents, task);
    
    if (bestAgent) {
      task.assignedAgent = bestAgent.id;
      task.status = 'processing';
      bestAgent.currentTasks.push(task);
      bestAgent.load = bestAgent.currentTasks.length / bestAgent.maxConcurrentTasks;
      
      this.tasks.set(task.id, task);
      this.emit('task_assigned', { task, agent: bestAgent });
      
      return bestAgent.id;
    }
    
    return null;
  }

  // Agent Discovery and Load Balancing
  private findCapableAgents(task: Task): ADKAgent[] {
    return Array.from(this.agents.values()).filter(agent => 
      agent.status === 'active' && 
      agent.currentTasks.length < agent.maxConcurrentTasks &&
      this.agentCanHandleTask(agent, task)
    );
  }

  private agentCanHandleTask(agent: ADKAgent, task: Task): boolean {
    // Capability matching logic
    const taskRequirements = this.getTaskRequirements(task.type);
    return taskRequirements.every(req => agent.capabilities.includes(req));
  }

  private getTaskRequirements(taskType: string): string[] {
    const requirements: { [key: string]: string[] } = {
      'customer_inquiry': ['nlp', 'routing', 'context_analysis'],
      'technical_support': ['technical_knowledge', 'troubleshooting', 'documentation'],
      'sales_inquiry': ['product_knowledge', 'pricing', 'negotiation'],
      'escalation': ['priority_handling', 'expert_knowledge', 'management']
    };
    return requirements[taskType] || [];
  }

  private selectOptimalAgent(agents: ADKAgent[], task: Task): ADKAgent | null {
    if (agents.length === 0) return null;
    
    // Advanced load balancing with capability scoring
    return agents.reduce((best, current) => {
      const bestScore = this.calculateAgentScore(best, task);
      const currentScore = this.calculateAgentScore(current, task);
      return currentScore > bestScore ? current : best;
    });
  }

  private calculateAgentScore(agent: ADKAgent, task: Task): number {
    const loadFactor = 1 - agent.load; // Lower load = higher score
    const priorityMatch = agent.priority >= task.priority === 'critical' ? 2 : 1;
    const capabilityMatch = this.getCapabilityMatchScore(agent, task);
    
    return loadFactor * priorityMatch * capabilityMatch;
  }

  private getCapabilityMatchScore(agent: ADKAgent, task: Task): number {
    const required = this.getTaskRequirements(task.type);
    const matches = required.filter(req => agent.capabilities.includes(req)).length;
    return matches / Math.max(required.length, 1);
  }

  // Inter-Agent Communication
  sendMessage(message: AgentMessage): void {
    console.log(`[ADK] Message: ${message.from} -> ${message.to} (${message.type})`);
    this.messageQueue.push(message);
    this.processMessageQueue();
  }

  private processMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      this.deliverMessage(message);
    }
  }

  private deliverMessage(message: AgentMessage): void {
    const targetAgent = this.agents.get(message.to);
    if (targetAgent) {
      this.emit(`message_${message.to}`, message);
    }
  }

  // Event System
  on(event: string, callback: Function): void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)!.push(callback);
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.subscribers.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  // Monitoring and Analytics
  getSystemMetrics(): any {
    const agents = Array.from(this.agents.values());
    const tasks = Array.from(this.tasks.values());
    
    return {
      totalAgents: agents.length,
      activeAgents: agents.filter(a => a.status === 'active').length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      averageLoad: agents.reduce((sum, a) => sum + a.load, 0) / agents.length,
      averageResponseTime: this.calculateAverageResponseTime(tasks),
      systemEfficiency: this.calculateSystemEfficiency(agents, tasks)
    };
  }

  private calculateAverageResponseTime(tasks: Task[]): number {
    const completedTasks = tasks.filter(t => t.completedAt && t.actualDuration);
    if (completedTasks.length === 0) return 0;
    
    const totalTime = completedTasks.reduce((sum, task) => sum + (task.actualDuration || 0), 0);
    return totalTime / completedTasks.length;
  }

  private calculateSystemEfficiency(agents: ADKAgent[], tasks: Task[]): number {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    
    if (totalTasks === 0 || activeAgents === 0) return 0;
    return (completedTasks / totalTasks) * (activeAgents / agents.length) * 100;
  }

  // Agent Health Monitoring
  performHealthCheck(): { [agentId: string]: boolean } {
    const healthStatus: { [agentId: string]: boolean } = {};
    
    this.agents.forEach((agent, id) => {
      healthStatus[id] = this.isAgentHealthy(agent);
      if (!healthStatus[id]) {
        console.warn(`[ADK] Agent ${agent.name} (${id}) failed health check`);
        this.handleUnhealthyAgent(agent);
      }
    });
    
    return healthStatus;
  }

  private isAgentHealthy(agent: ADKAgent): boolean {
    // Check if agent is responsive and not overloaded
    return agent.status !== 'offline' && agent.load < 0.95;
  }

  private handleUnhealthyAgent(agent: ADKAgent): void {
    // Redistribute tasks from unhealthy agent
    const tasksToRedistribute = [...agent.currentTasks];
    agent.currentTasks = [];
    agent.status = 'offline';
    
    tasksToRedistribute.forEach(task => {
      task.assignedAgent = undefined;
      task.status = 'pending';
      this.assignTask(task);
    });
  }
}

// Global ADK instance
export const adkCore = new ADKCore();
