
import React, { useState } from 'react';
import Header from '@/components/Header';
import AgentCard from '@/components/AgentCard';
import ChatInterface from '@/components/ChatInterface';
import AgentOrchestrationDashboard from '@/components/AgentOrchestrationDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('agents');

  const agents = [
    {
      name: 'Routing Agent Alpha',
      type: 'routing' as const,
      status: 'active' as const,
      tasksHandled: 156,
      successRate: 98,
      description: 'Intelligently routes customer inquiries to appropriate specialists based on intent analysis and context understanding.'
    },
    {
      name: 'Support Agent Beta',
      type: 'support' as const,
      status: 'busy' as const,
      tasksHandled: 89,
      successRate: 94,
      description: 'Handles technical support requests, troubleshooting, and provides comprehensive product assistance.'
    },
    {
      name: 'Sales Agent Gamma',
      type: 'sales' as const,
      status: 'active' as const,
      tasksHandled: 67,
      successRate: 87,
      description: 'Manages sales inquiries, product demonstrations, pricing discussions, and upselling opportunities.'
    },
    {
      name: 'Escalation Agent Delta',
      type: 'escalation' as const,
      status: 'idle' as const,
      tasksHandled: 23,
      successRate: 100,
      description: 'Handles complex cases requiring specialized attention and coordinates with human agents when necessary.'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'agents':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Multi-Agent Customer Service Ecosystem
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the future of customer engagement with our intelligent multi-agent system. 
                Each specialized agent works in harmony to deliver exceptional customer experiences 
                through advanced AI orchestration and contextual understanding.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent, index) => (
                <AgentCard key={index} {...agent} />
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Intelligent Agent Coordination
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold mb-2">Smart Routing</h4>
                  <p className="text-sm text-gray-600">
                    Advanced NLP analyzes customer intent and routes to the most qualified agent
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold mb-2">Seamless Handoffs</h4>
                  <p className="text-sm text-gray-600">
                    Context-aware transitions between agents maintain conversation continuity
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold mb-2">Real-time Analytics</h4>
                  <p className="text-sm text-gray-600">
                    Continuous performance monitoring and optimization across all agents
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Interactive Customer Service Experience
              </h2>
              <p className="text-lg text-gray-600">
                Try our multi-agent system in action. Watch as different specialized agents 
                collaborate to provide comprehensive customer support.
              </p>
            </div>
            <ChatInterface />
          </div>
        );
      case 'orchestration':
        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Agent Orchestration Dashboard
              </h2>
              <p className="text-lg text-gray-600">
                Monitor real-time agent activities, performance metrics, and system coordination 
                in our comprehensive orchestration dashboard.
              </p>
            </div>
            <AgentOrchestrationDashboard />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
