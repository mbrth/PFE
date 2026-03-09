import React from 'react';
import { useChat } from '../hooks/useChat';

/**
 * Conversational AI Interface for personalized career guidance.
 * This component provides an interactive way for users to explore eco-responsible paths,
 * leveraging LLM capabilities to answer specific questions about technology impact.
 */
const ChatInterface: React.FC = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    scrollRef,
    sendMessage,
    resetChat
  } = useChat();

  // Preset suggestions to help the user start the conversation with high-value topics.
  const suggestions = [
    { label: "Réduire mon empreinte CO2", icon: "fa-leaf" },
    { label: "Parcours 100% Souverain", icon: "fa-shield-halved" },
    { label: "Apprendre l'IA locale", icon: "fa-microchip" }
  ];

  return (
    <div className="flex flex-col h-auto md:h-[700px] max-w-full bg-white rounded-[3rem] border border-ink/5 shadow-2xl shadow-ink/5 overflow-hidden animate-in fade-in duration-500">
      {/* Branding and Connectivity Status */}
      <div className="px-6 md:px-10 py-6 bg-ink text-white flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-sage flex items-center justify-center text-xl shadow-lg shadow-sage/30">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sand border-2 border-ink rounded-full"></div>
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight leading-none">Mentor IA</h3>
            <div className="flex items-center gap-2 mt-2">
               <span className="text-[10px] font-bold text-sage-light uppercase tracking-widest">Connecté à l'infrastructure EU</span>
            </div>
          </div>
        </div>
          <div className="flex gap-2">
          <button onClick={resetChat} title="Réinitialiser la conversation" aria-label="Réinitialiser" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white">
            <i className="fa-solid fa-rotate-right text-sm"></i>
          </button>
        </div>
      </div>

      {/* Message History with distinct visual roles for human vs assistant */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-10 bg-base-bg"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-sm font-bold ${
                msg.role === 'user' ? 'bg-sage/20 text-sage' : 'bg-ink text-white'
              }`}>
                {msg.role === 'user' ? 'Moi' : <i className="fa-solid fa-robot"></i>}
              </div>
              
              <div className={`space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-6 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-sage text-white rounded-tr-none shadow-md shadow-sage/20' 
                    : 'bg-white border border-ink/5 text-ink shadow-sm rounded-tl-none'
                }`}>
                  {msg.content.split('\n').map((line, index) => (
                    <p key={index} className={line.trim() ? "mb-2" : "mb-4"}>
                      {line}
                    </p>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-ink/30 uppercase px-2 tracking-widest">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Visual feedback indicating the AI is processing the request */}
        {isTyping && (
          <div className="flex justify-start gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-2xl bg-ink text-white flex items-center justify-center text-xs">
              <i className="fa-solid fa-ellipsis animate-bounce"></i>
            </div>
            <div className="bg-white border border-ink/5 p-5 rounded-[2rem] rounded-tl-none">
              <span className="text-[10px] font-black text-ink/40 uppercase tracking-widest">Analyse de l'empreinte en cours...</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive suggestions to reduce user friction during discovery */}
      {messages.length < 3 && !isTyping && (
        <div className="px-6 md:px-10 pb-6 flex flex-wrap gap-3 bg-base-bg">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => sendMessage(s.label)}
              className="px-5 py-3 bg-white border border-ink/5 rounded-full text-xs font-bold text-ink/60 hover:border-sage hover:text-sage transition-all flex items-center gap-3 shadow-sm"
            >
              <i className={`fa-solid ${s.icon} text-sage`}></i>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input area for free-form user inquiries */}
      <div className="p-6 md:p-10 pt-6 border-t border-ink/5 bg-white">
        <div className="relative group max-w-4xl mx-auto px-0">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Posez votre question sur l'éco-conception ou le code..."
            className="w-full pl-8 pr-20 py-5 bg-base-bg border border-ink/5 rounded-[2rem] text-sm font-medium outline-none focus:ring-4 focus:ring-sage/20 focus:bg-white focus:border-sage transition-all"
          />
          <button 
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-ink hover:bg-sage disabled:opacity-30 disabled:hover:bg-ink text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <i className="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </div>
        <p className="text-center text-[10px] text-ink/30 font-bold uppercase tracking-[0.2em] mt-6">
           L'IA EcoOrient peut omettre certains détails. Vérifiez les outils de mesure officiels.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
