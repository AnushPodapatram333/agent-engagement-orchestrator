
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Users, TrendingUp, AlertTriangle } from 'lucide-react';

interface AgentCardProps {
  name: string;
  type: 'routing' | 'support' | 'sales' | 'escalation';
  status: 'active' | 'idle' | 'busy';
  tasksHandled: number;
  successRate: number;
  description: string;
}

const AgentCard = ({ name, type, status, tasksHandled, successRate, description }: AgentCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'routing':
        return <Users className="h-5 w-5" />;
      case 'support':
        return <Bot className="h-5 w-5" />;
      case 'sales':
        return <TrendingUp className="h-5 w-5" />;
      case 'escalation':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'idle':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'busy':
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'routing':
        return 'bg-blue-100 text-blue-800';
      case 'support':
        return 'bg-purple-100 text-purple-800';
      case 'sales':
        return 'bg-green-100 text-green-800';
      case 'escalation':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>
        <Badge variant="secondary" className={getTypeColor()}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Agent
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Tasks Handled</span>
            <p className="font-semibold text-lg">{tasksHandled}</p>
          </div>
          <div>
            <span className="text-gray-500">Success Rate</span>
            <p className="font-semibold text-lg text-green-600">{successRate}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
