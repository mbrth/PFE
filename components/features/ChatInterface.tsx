
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '../../hooks/useChat';
import { db } from '../../services/db';

const ChatInterface: React.FC = () => {
  const { messages, input, setInput, isTyping, sendMessage, scrollRef } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Stats for the user to see real-time impact
  const [carbonSaved, setCarbonSaved] = React.useState(0);

  useEffect(() => {
    db.getCarbonStats().then(stats => setCarbonSaved(stats.totalSaved));
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-[3rem] shadow-2xl border border-ink/5 overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Header Stats */}
      <div className="px-8 py-4 bg-base-bg/50 border-b border-ink/5 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white text-xs">
               <i className="fa-solid fa-robot"></i>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">Mentor IA Actif</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
               <span className="text-[8px] font-black text-ink/20 uppercase">Économie Carbone</span>
               <span className="text-xs font-black text-emerald-600">-{carbonSaved.toFixed(1)}g CO2e</span>
            </div>
         </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[80%] ${msg.role === 'assistant' ? 'bg-base-bg text-ink rounded-2xl rounded-tl-none' : 'bg-ink text-white rounded-2xl rounded-tr-none'} p-6 shadow-sm`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/5 prose-pre:p-4 prose-pre:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
              </div>
              <span className="text-[8px] opacity-30 mt-4 block font-black uppercase tracking-widest">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-base-bg p-6 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-8 bg-white border-t border-ink/5">
        <div className="relative group">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Posez votre question sur le numérique responsable..."
            className="w-full bg-base-bg border-2 border-transparent focus:border-sage focus:bg-white rounded-[2rem] px-8 py-6 pr-20 outline-none transition-all font-bold text-ink resize-none min-h-[80px]"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="absolute right-4 bottom-4 w-12 h-12 bg-sage hover:bg-ink disabled:bg-ink/10 text-white rounded-2xl shadow-xl shadow-sage/20 flex items-center justify-center transition-all transform active:scale-95"
          >
            {isTyping ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
          </button>
        </div>
        <p className="text-[9px] text-center mt-4 font-black text-ink/20 uppercase tracking-widest flex items-center justify-center gap-2">
           <i className="fa-solid fa-bolt-lightning text-amber-400"></i>
           Inférence ultra-rapide propulsée par Groq LPU
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
