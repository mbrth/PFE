
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-24 md:pb-32">
      {/* Subtle floating elements */}
      <i className="hidden md:block fa-solid fa-leaf absolute top-20 left-10 rotate-12 text-sage/10 text-4xl"></i>
      <i className="hidden md:block fa-solid fa-bolt absolute bottom-40 right-20 -rotate-12 text-sand-dark/10 text-4xl"></i>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        
        <div className="space-y-8 md:space-y-12 relative z-10 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-ink leading-[1] md:leading-[0.95] tracking-tighter">
            Coder avec <br /> 
            <span className="text-sage italic font-serif font-normal">Conscience.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-ink/60 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
            Maîtrisez la <span className="text-ink font-bold">programmation</span> et l'<span className="text-ink font-bold">IA</span> tout en réduisant votre empreinte écologique. Des parcours certifiés pour les architectes de demain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4 justify-center lg:justify-start">
            <button onClick={onStart} className="px-10 py-5 bg-sage text-white rounded-2xl font-black text-lg shadow-xl shadow-sage/20 hover:bg-ink transition-all flex items-center justify-center gap-3 active:scale-95">
              Démarrer le voyage <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
            <button className="px-10 py-5 border-2 border-ink/10 text-ink rounded-2xl font-black hover:bg-white transition-all flex items-center justify-center gap-3">
              Voir la méthode
            </button>
          </div>

          <div className="pt-8 md:pt-12 flex flex-col sm:flex-row flex-wrap gap-6 md:gap-10 justify-center lg:justify-start">
             <div className="flex items-center gap-4 text-left">
                <i className="fa-solid fa-server text-xl text-sand-dark"></i>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-ink/40 leading-tight">Infrastructure <br /><span className="text-ink">100% Locale</span></p>
             </div>
             <div className="flex items-center gap-4 text-left">
                <i className="fa-solid fa-shield-heart text-xl text-clay"></i>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-ink/40 leading-tight">Données <br /><span className="text-ink">Garanties Éthiques</span></p>
             </div>
             <div className="flex items-center gap-4 text-left">
                <i className="fa-solid fa-award text-xl text-sage"></i>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-ink/40 leading-tight">Certification <br /><span className="text-ink">Souveraine</span></p>
             </div>
          </div>
        </div>

        {/* VISUAL - SECURED AGAINST CLIPPING */}
        <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0 lg:pr-12">
          <div className="relative w-full max-w-sm space-y-4">
             {/* Floating Badge 1 - Carbon */}
             <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-ink/5 transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-20 relative">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-base-bg flex items-center justify-center text-sage text-2xl">
                      <i className="fa-solid fa-tree-city"></i>
                   </div>
                   <div>
                      <p className="text-3xl font-black text-ink">14.2 kg</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-ink/20">CO2 Économisé</p>
                   </div>
                </div>
             </div>

             {/* Floating Badge 2 - Score (Shifted left to avoid clipping) */}
             <div className="bg-ink p-8 rounded-[2.5rem] shadow-2xl transform translate-x-4 -translate-y-2 rotate-3 hover:rotate-0 transition-transform duration-500 text-white z-10 relative">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-sage-light text-2xl">
                      <i className="fa-solid fa-microchip"></i>
                   </div>
                   <div>
                      <p className="text-lg font-black tracking-tight">Score Algorithme</p>
                      <div className="flex gap-1.5 mt-1">
                         {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-sage"></div>)}
                         <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
