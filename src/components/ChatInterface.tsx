
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  agentType?: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant orchestrator. How can I help you today?',
      sender: 'agent',
      agentType: 'Routing Agent',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const simulateAgentResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let agentType = 'Support Agent';
      let response = '';

      // Simple routing logic for demonstration
      if (userMessage.toLowerCase().includes('buy') || userMessage.toLowerCase().includes('price')) {
        agentType = 'Sales Agent';
        response = 'I can help you with pricing and purchasing options. Let me connect you with our sales specialist who can provide detailed information about our products and current offers.';
      } else if (userMessage.toLowerCase().includes('problem') || userMessage.toLowerCase().includes('error')) {
        agentType = 'Support Agent';
        response = 'I understand you\'re experiencing an issue. Let me analyze your problem and provide a solution. Can you describe the specific error or problem you\'re encountering?';
      } else if (userMessage.toLowerCase().includes('urgent') || userMessage.toLowerCase().includes('escalate')) {
        agentType = 'Escalation Agent';
        response = 'I\'ve detected this requires priority handling. I\'m escalating your case to our specialized team and will ensure you receive immediate attention from a human agent.';
      } else {
        agentType = 'Routing Agent';
        response = 'Thank you for your message. I\'m analyzing your request and will route you to the most appropriate specialist. How else can I assist you today?';
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'agent',
        agentType,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAgentResponse(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>Multi-Agent Customer Service</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.sender === 'agent' && message.agentType && (
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {message.agentType}
                    </Badge>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
