
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-24 md:pb-32 overflow-hidden">
      {/* Icônes flottantes (masquées sur mobile pour ne pas surcharger) */}
      <i className="hidden md:block fa-solid fa-seedling icon-float top-20 left-10 rotate-12 text-2xl"></i>
      <i className="hidden md:block fa-solid fa-wind icon-float bottom-40 right-20 -rotate-12 text-2xl"></i>
      <i className="hidden md:block fa-solid fa-sun icon-float top-40 right-10 text-2xl"></i>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        
        <div className="space-y-8 md:space-y-12 relative z-10 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-ink leading-[1] md:leading-[0.95] tracking-tighter">
            Coder avec <br /> 
            <span className="text-sage italic font-serif font-normal">Conscience.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-ink/60 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
            Maîtrisez la <span className="text-ink font-bold">programmation</span> et l'<span className="text-ink font-bold">Intelligence Artificielle</span> tout en réduisant drastiquement votre empreinte écologique. Des formations complètes pour les développeurs de demain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4 justify-center lg:justify-start">
            <button onClick={onStart} className="btn-main justify-center">
              Démarrer le voyage <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
            <button className="px-8 md:px-10 py-4 md:py-5 border-2 border-ink/10 text-ink rounded-2xl font-bold hover:bg-white transition-all flex items-center justify-center gap-3">
              <i className="fa-solid fa-circle-play text-sage text-lg"></i> Voir la méthode
            </button>
          </div>

          {/* Points clés */}
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
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-ink/40 leading-tight">Certification <br /><span className="text-ink">Éco-Responsable</span></p>
             </div>
          </div>
        </div>

        {/* Visuel Impact */}
        <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0">
          <div className="absolute inset-0 bg-sage-light/30 rounded-full blur-[100px]"></div>
          
          <div className="relative card-eco w-full max-w-md space-y-8 md:space-y-12 p-6 md:p-10">
             <div className="flex justify-between items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-ink/5 shadow-sm flex items-center justify-center text-clay text-base md:text-lg">
                   <i className="fa-solid fa-fingerprint"></i>
                </div>
                <div className="text-right">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-ink/30">ID Apprenant</p>
                   <p className="font-serif italic text-base md:text-lg text-ink">Sacha Eco-Orient</p>
                </div>
             </div>

             <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-base-bg rounded-2xl md:rounded-3xl">
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage text-lg md:text-xl">
                      <i className="fa-solid fa-tree-city"></i>
                   </div>
                   <div>
                      <p className="text-xl md:text-2xl font-black text-ink">14.2 kg</p>
                      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-ink/40">Équivalent CO2 Évité</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-ink rounded-2xl md:rounded-3xl text-white">
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center text-sage-light text-lg md:text-xl">
                      <i className="fa-solid fa-microchip"></i>
                   </div>
                   <div>
                      <p className="text-base md:text-lg font-black">Score Algorithme</p>
                      <div className="flex gap-1 mt-1">
                         {[1,2,3,4].map(i => <i key={i} className="fa-solid fa-bolt text-[8px] text-sage"></i>)}
                         <i className="fa-solid fa-bolt text-[8px] opacity-20"></i>
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
