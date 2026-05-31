'use client';

import { useState, useRef, useEffect } from 'react';

export default function Aether() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm Aether, your personal AI agent.\n\nI have memory of our conversations. I can help you with research, business ideas, planning, analysis, and more.\n\nWhat would you like to do today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || "I received your message." }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please try again." 
      }]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-violet-400">Aether</h1>
        
        <div ref={chatRef} className="h-[70vh] overflow-y-auto bg-zinc-900 rounded-3xl p-6 mb-6 space-y-6 border border-zinc-800">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-4 rounded-2xl ${
                msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-100'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-violet-400 italic">Aether is thinking...</div>}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your command here..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 px-10 rounded-2xl font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
