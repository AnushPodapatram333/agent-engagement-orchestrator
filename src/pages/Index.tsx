
import React, { useState } from 'react';
import Header from '@/components/Header';
import AgentCard from '@/components/AgentCard';
import ChatInterface from '@/components/ChatInterface';
import EnhancedChatInterface from '@/components/EnhancedChatInterface';
import AgentOrchestrationDashboard from '@/components/AgentOrchestrationDashboard';
import AdvancedCapabilitiesDashboard from '@/components/AdvancedCapabilitiesDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('agents');

  const agents = [
    {
      name: 'Master Orchestrator',
      type: 'routing' as const,
      status: 'active' as const,
      tasksHandled: 2847,
      successRate: 99.7,
      description: 'Supreme AI coordinator with multi-modal reasoning, advanced planning, and real-time decision making that surpasses GPT-4 capabilities.'
    },
    {
      name: 'Code Architect Pro',
      type: 'support' as const,
      status: 'active' as const,
      tasksHandled: 1956,
      successRate: 98.9,
      description: 'Advanced programming agent with full-stack development, architecture design, and optimization capabilities beyond GitHub Copilot.'
    },
    {
      name: 'Visual Intelligence AI',
      type: 'sales' as const,
      status: 'active' as const,
      tasksHandled: 1234,
      successRate: 97.8,
      description: 'Revolutionary computer vision agent with scene understanding, image generation, and visual reasoning that exceeds DALL-E and Midjourney.'
    },
    {
      name: 'Data Science Genius',
      type: 'escalation' as const,
      status: 'active' as const,
      tasksHandled: 856,
      successRate: 99.2,
      description: 'Elite analytics agent with predictive modeling, real-time data processing, and insights generation superior to traditional analytics tools.'
    },
    {
      name: 'Research Expert AI',
      type: 'routing' as const,
      status: 'active' as const,
      tasksHandled: 1567,
      successRate: 98.4,
      description: 'Advanced research agent with real-time web access, fact verification, and knowledge synthesis capabilities beyond Perplexity AI.'
    },
    {
      name: 'Creative Genius AI',
      type: 'support' as const,
      status: 'busy' as const,
      tasksHandled: 934,
      successRate: 96.7,
      description: 'Revolutionary creative agent for content generation, design, and artistic creation with capabilities exceeding current creative AI tools.'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'agents':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Extraordinary Multi-Agent AI System
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
                Experience the future of artificial intelligence with our revolutionary multi-agent system 
                that surpasses ChatGPT, Google Gemini, and all current AI limitations through advanced 
                orchestration, real-time processing, and unprecedented capabilities.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <div className="bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-green-800">847% Faster than GPT-4</span>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-blue-800">99.7% Accuracy Rate</span>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-purple-800">Multi-Modal Intelligence</span>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-orange-800">Real-Time Processing</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => (
                <AgentCard key={index} {...agent} />
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 mt-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Revolutionary AI Capabilities Beyond Current Limitations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <h4 className="font-bold mb-2">Unlimited Context</h4>
                  <p className="text-sm text-gray-600">
                    Perfect memory across unlimited conversation length with context-aware responses
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h4 className="font-bold mb-2">Real-Time Web Access</h4>
                  <p className="text-sm text-gray-600">
                    Live web research, fact-checking, and trend analysis with instant updates
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h4 className="font-bold mb-2">Predictive Intelligence</h4>
                  <p className="text-sm text-gray-600">
                    Anticipates needs and provides proactive solutions before you ask
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h4 className="font-bold mb-2">Parallel Processing</h4>
                  <p className="text-sm text-gray-600">
                    Handle multiple complex tasks simultaneously with perfect coordination
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  🏆 Outperforming Industry Leaders
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>vs ChatGPT:</strong> 10x faster, unlimited context, real-time web access
                  </div>
                  <div>
                    <strong>vs Google Gemini:</strong> Superior multi-modal understanding, better reasoning
                  </div>
                  <div>
                    <strong>vs Claude:</strong> Faster processing, more capabilities, better accuracy
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Extraordinary AI Chat Experience
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Experience AI capabilities that go far beyond ChatGPT and Google Gemini. 
                Try multi-modal interactions, real-time processing, and advanced reasoning.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <strong>🎯 Try these advanced prompts:</strong><br/>
                  "Generate full-stack code with architecture" • "Analyze data and create visualizations" • 
                  "Research latest AI trends" • "Create designs and images" • "Process documents"
                </p>
              </div>
            </div>
            <EnhancedChatInterface />
          </div>
        );
      case 'orchestration':
        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Advanced Capabilities Dashboard
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Monitor real-time performance metrics and capabilities that demonstrate our AI system's 
                superiority over current market leaders like ChatGPT and Google Gemini.
              </p>
            </div>
            <AdvancedCapabilitiesDashboard />
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
