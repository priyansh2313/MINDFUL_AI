import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const MindfulAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your Mindful Assistant. I'm here to listen and provide support. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    "I'm feeling anxious",
    "I need help relaxing",
    "How can I improve my mood?",
    "Tell me a calming exercise"
  ];

  const handleSend = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = {
      anxiety: "It's normal to feel anxious. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, and exhale for 4. Repeat this 4 times.",
      relaxation: "Here's a simple relaxation technique: Progressive muscle relaxation. Start by tensing and then relaxing each muscle group, from your toes to your head.",
      mood: "To improve your mood, try: 1. Get some sunlight 2. Light exercise 3. Connect with a friend 4. Do something creative",
      default: "I hear you. Would you like to try some mindfulness exercises or would you prefer to talk more about what's on your mind?"
    };

    const lowercaseMessage = userMessage.toLowerCase();
    if (lowercaseMessage.includes('anxious') || lowercaseMessage.includes('anxiety')) {
      return responses.anxiety;
    } else if (lowercaseMessage.includes('relax')) {
      return responses.relaxation;
    } else if (lowercaseMessage.includes('mood')) {
      return responses.mood;
    }
    return responses.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                Mindful Assistant
              </h1>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100vh-16rem)]">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-sm rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === 'assistant' && (
                        <Sparkles className="h-4 w-4 text-indigo-600" />
                      )}
                      <span className="text-xs opacity-75">{message.timestamp}</span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfulAssistant;