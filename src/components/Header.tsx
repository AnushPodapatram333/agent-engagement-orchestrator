
import React from 'react';
import { Bot, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">AgentCore ADK</h1>
              <p className="text-sm text-gray-500">Multi-Agent Orchestration Platform</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          <Button
            variant={activeTab === 'agents' ? 'default' : 'ghost'}
            onClick={() => onTabChange('agents')}
            className="flex items-center space-x-2"
          >
            <Bot className="h-4 w-4" />
            <span>Agents</span>
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            onClick={() => onTabChange('chat')}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Chat Interface</span>
          </Button>
          <Button
            variant={activeTab === 'orchestration' ? 'default' : 'ghost'}
            onClick={() => onTabChange('orchestration')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Orchestration</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
