
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, MessageSquare, TrendingUp, Users } from 'lucide-react';

interface AgentActivity {
  name: string;
  type: string;
  status: string;
  currentTask: string;
  progress: number;
}

const AgentOrchestrationDashboard = () => {
  const [activities, setActivities] = useState<AgentActivity[]>([
    {
      name: 'Routing Agent Alpha',
      type: 'routing',
      status: 'active',
      currentTask: 'Analyzing customer intent for inquiry #1847',
      progress: 75
    },
    {
      name: 'Support Agent Beta',
      type: 'support',
      status: 'busy',
      currentTask: 'Resolving technical issue for customer #9821',
      progress: 45
    },
    {
      name: 'Sales Agent Gamma',
      type: 'sales',
      status: 'active',
      currentTask: 'Processing quote request for Enterprise plan',
      progress: 90
    },
    {
      name: 'Escalation Agent Delta',
      type: 'escalation',
      status: 'idle',
      currentTask: 'Standing by for priority cases',
      progress: 0
    }
  ]);

  const [stats, setStats] = useState({
    totalInteractions: 1247,
    activeAgents: 3,
    avgResponseTime: 2.3,
    satisfactionRate: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => prev.map(activity => {
        if (activity.status === 'active' || activity.status === 'busy') {
          const newProgress = Math.min(activity.progress + Math.random() * 5, 100);
          return { ...activity, progress: newProgress };
        }
        return activity;
      }));

      setStats(prev => ({
        ...prev,
        totalInteractions: prev.totalInteractions + Math.floor(Math.random() * 3),
        avgResponseTime: Math.max(1.5, prev.avgResponseTime + (Math.random() - 0.5) * 0.2)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-orange-100 text-orange-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Interactions</p>
                <p className="text-2xl font-bold">{stats.totalInteractions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold">{stats.activeAgents}/4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold">{stats.avgResponseTime.toFixed(1)}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
                <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Real-time Agent Orchestration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold">{activity.name}</h4>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{activity.progress}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{activity.currentTask}</p>
                <Progress value={activity.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentOrchestrationDashboard;
