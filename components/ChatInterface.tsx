
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getOrientationAdvice } from '../services/geminiService';
import { fetchExternalData } from '../services/externalApi';
import { MOCKED_COURSES } from '../constants';

const ChatInterface: React.FC = () => {
  const initialAssistantMessage: ChatMessage = {
    role: 'assistant',
    content: "Bonjour ! Je suis votre consultant EcoOrient. Je peux vous aider à concevoir un parcours de formation qui optimise vos compétences techniques tout en minimisant votre empreinte carbone et en maximisant votre souveraineté numérique. Par quoi souhaiteriez-vous commencer ?",
    timestamp: new Date()
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const suggestions = [
    { label: "Réduire mon empreinte CO2", icon: "fa-leaf" },
    { label: "Parcours 100% Souverain", icon: "fa-shield-halved" },
    { label: "Devenir Expert Cloud", icon: "fa-cloud" }
  ];

  const handleSend = async (text: string = input) => {
    const messageToSend = text.trim();
    if (!messageToSend) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Try to fetch supplemental data from an external API and include it
    const external = await fetchExternalData(messageToSend);
    const advice = await getOrientationAdvice(messageToSend, MOCKED_COURSES, external);

    const botMsg: ChatMessage = {
      role: 'assistant',
      content: advice,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleReset = () => {
    setMessages([ { ...initialAssistantMessage, timestamp: new Date() } ]);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-auto md:h-[700px] max-w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in duration-500">
      {/* Chat Header */}
      <div className="px-4 md:px-8 py-4 md:py-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-lg md:text-xl shadow-lg shadow-indigo-500/20">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight leading-none">Expert Orientation IA</h3>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Connecté à l'infrastructure EU</span>
            </div>
          </div>
        </div>
          <div className="flex gap-2">
          <button onClick={handleReset} title="Réinitialiser la conversation" aria-label="Réinitialiser" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white">
            <i className="fa-solid fa-rotate-right text-xs"></i>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-[#FDFDFE]"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-900 text-white'
              }`}>
                {msg.role === 'user' ? 'MOI' : 'AI'}
              </div>
              
              <div className={`space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 md:p-5 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                    : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
                }`}>
                  {msg.content.split('\n').map((line, index) => (
                    <p key={index} className={line.trim() ? "mb-2" : "mb-4"}>
                      {line}
                    </p>
                  ))}
                </div>
                <span className="text-[9px] font-bold text-slate-300 uppercase px-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start gap-4 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px]">
              <i className="fa-solid fa-ellipsis animate-bounce"></i>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyse de la souveraineté en cours...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions Overlay (Only if few messages) */}
      {messages.length < 3 && !isTyping && (
        <div className="px-4 md:px-8 pb-4 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => handleSend(s.label)}
              className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <i className={`fa-solid ${s.icon} text-indigo-400`}></i>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="p-4 md:p-8 pt-4 border-t border-slate-50 bg-white">
        <div className="relative group max-w-3xl md:max-w-4xl mx-auto px-0">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question stratégique..."
            className="w-full pl-6 pr-16 py-4 md:py-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-300 transition-all shadow-inner"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-indigo-600 disabled:opacity-30 text-white w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95"
          >
            <i className="fa-solid fa-paper-plane-top text-xs"></i>
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-4">
           EcoOrient AI peut faire des erreurs. Vérifiez les certifications officielles.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
