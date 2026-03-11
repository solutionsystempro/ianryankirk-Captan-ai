
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getClarityResponse } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ClarityCoachModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "I'm Victoria. Let's find your one path forward. What are you stuck on right now?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getClarityResponse([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-background-alt border border-white/10 rounded-lg shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-background-alt/50">
          <div>
            <h3 className="text-xl font-display text-accent tracking-widest">Business Clarity Coach</h3>
            <p className="text-xs text-warm-gray font-mono">Status: Connected to Victoria Intelligence Layer</p>
          </div>
          <button onClick={onClose} className="text-warm-gray hover:text-off-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-sm font-sans text-sm ${
                msg.role === 'user' 
                  ? 'bg-starlink text-white rounded-br-none' 
                  : 'bg-white/5 border border-white/10 text-off-white rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-sm animate-pulse flex gap-2">
                <span className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-warm-gray rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-warm-gray rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-background-alt/50">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your current bottleneck..."
              className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-off-white focus:outline-none focus:border-accent transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-accent text-background px-6 py-3 rounded-sm font-bold text-xs tracking-widest hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              Analyze
            </button>
          </div>
          <p className="mt-4 text-[10px] text-warm-gray font-mono text-center opacity-50 tracking-widest">
            Powered by Victoria AI Engine • Captain AI Systems
          </p>
        </div>
      </div>
    </div>
  );
};
