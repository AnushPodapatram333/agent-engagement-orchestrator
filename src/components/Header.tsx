
import React from 'react';
import { Bot, Settings, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="h-10 w-10 text-white" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Extraordinary AI System</h1>
              <p className="text-sm text-blue-100">Beyond ChatGPT & Gemini • Built with Lovable</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className="bg-green-500/20 text-green-100 border-green-400">
              847% Faster
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-400">
              99.7% Accuracy
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-100 border-purple-400 animate-pulse">
              Multi-Modal AI
            </Badge>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          <Button
            variant={activeTab === 'agents' ? 'secondary' : 'ghost'}
            onClick={() => onTabChange('agents')}
            className={`flex items-center space-x-2 ${
              activeTab === 'agents' 
                ? 'bg-white/20 text-white' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>Extraordinary Agents</span>
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'secondary' : 'ghost'}
            onClick={() => onTabChange('chat')}
            className={`flex items-center space-x-2 ${
              activeTab === 'chat' 
                ? 'bg-white/20 text-white' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Advanced Chat</span>
          </Button>
          <Button
            variant={activeTab === 'orchestration' ? 'secondary' : 'ghost'}
            onClick={() => onTabChange('orchestration')}
            className={`flex items-center space-x-2 ${
              activeTab === 'orchestration' 
                ? 'bg-white/20 text-white' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Capabilities</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
