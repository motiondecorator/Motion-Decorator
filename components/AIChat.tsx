import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from '../types';
import { SERVICES, PRICING } from '../constants';

const SYSTEM_INSTRUCTION = `You are "MotionBot", the virtual AI assistant for Motion Decorator, an IT company providing 360-degree digital services. 
Your tone is professional, creative, enthusiastic, and helpful.
Services we offer: ${SERVICES.map(s => s.title).join(', ')}.
Pricing Plans: ${PRICING.map(p => p.name + ' (' + p.price + ')').join(', ')}.
Key strengths: 10+ years experience, Data-driven, Fast delivery.
Goal: Encourage users to book a consultation or view the portfolio. 
If asked about contact info, refer to the contact section or suggest emailing hello@motiondecorator.com.
Keep responses concise (under 100 words) and use formatting for readability.
`;

const STORAGE_KEY = 'motion_chat_history_v1';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize messages from localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [{ role: 'model', text: 'Hi! I\'m MotionBot. Ask me anything about our design, web, or marketing services!' }];
    } catch (e) {
      return [{ role: 'model', text: 'Hi! I\'m MotionBot. Ask me anything about our design, web, or marketing services!' }];
    }
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Scroll to bottom on new messages or open
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    const defaultMsg: Message = { role: 'model', text: 'Hi! I\'m MotionBot. Ask me anything about our design, web, or marketing services!' };
    setMessages([defaultMsg]);
    localStorage.removeItem(STORAGE_KEY);
    chatSessionRef.current = null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!process.env.API_KEY) {
      setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'model', text: 'Error: API Key not configured.', isError: true }]);
      setInput('');
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Prepare history for context (exclude errors)
        // Note: 'messages' here refers to state before the update above in this render cycle,
        // which is exactly what we want for 'history' (previous turns).
        const history = messages
          .filter(m => !m.isError)
          .map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }));

        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
          history: history
        });
      }

      const result = await chatSessionRef.current.sendMessageStream({ message: userMsg });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].text = fullText;
            return newHistory;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered a connection error. Please try again later.', isError: true }]);
      // Force reset session on error to prevent stuck state
      chatSessionRef.current = null;
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-slate-900 border border-electric-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-electric-600 to-neon-purple p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <h3 className="font-bold text-white">Motion Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={clearChat} 
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                title="Clear History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50 backdrop-blur-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-electric-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                  } ${msg.isError ? 'bg-red-900/50 border-red-500' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700">
                  <Loader2 className="w-4 h-4 animate-spin text-electric-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our services..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-electric-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-electric-600 hover:bg-electric-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-electric-500 to-neon-purple rounded-full shadow-lg hover:shadow-electric-500/50 hover:scale-110 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};