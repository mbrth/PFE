
import React from 'react';
import Navbar from './Landing/Navbar';
import Hero from './Landing/Hero';
import Pricing from './Landing/Pricing';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-base-bg font-sans text-ink overflow-x-hidden">
      <Navbar onStart={onStart} />
      
      <main>
        <Hero onStart={onStart} />
        
        {/* Methodology Section */}
        <section className="py-20 md:py-32 bg-white relative overflow-hidden border-y border-ink/5">
           <i className="hidden md:block fa-solid fa-dharmachakra absolute -top-10 -right-10 rotate-45 text-[150px] opacity-[0.02] pointer-events-none"></i>
           
           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16 md:mb-20 space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black text-ink">Comment ça marche ?</h2>
                 <p className="text-base md:text-lg text-ink/40 font-medium">Un parcours en 4 étapes pour une transformation complète.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                 <MethodStep 
                    icon="fa-magnifying-glass-chart"
                    step="01"
                    title="Audit Initial"
                    desc="Mesurez l'empreinte de vos projets actuels avec nos outils."
                    color="text-sand-dark"
                 />
                 <MethodStep 
                    icon="fa-book-open-reader"
                    step="02"
                    title="Code & Formation"
                    desc="Apprenez la programmation, l'IA et l'éco-conception logicielle."
                    color="text-sage"
                 />
                 <MethodStep 
                    icon="fa-certificate"
                    step="03"
                    title="Certification"
                    desc="Obtenez un titre reconnu de concepteur responsable."
                    color="text-clay"
                 />
                 <MethodStep 
                    icon="fa-chart-line"
                    step="04"
                    title="Impact Réel"
                    desc="Appliquez vos savoirs et réduisez concrètement votre impact."
                    color="text-ink"
                 />
              </div>
           </div>
        </section>

        {/* Labels Section */}
        <section className="py-12 md:py-16 bg-base-bg">
           <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-10 md:gap-24 opacity-40 items-center">
              <i className="fa-solid fa-award text-3xl"></i>
              <i className="fa-solid fa-shield-halved text-3xl"></i>
              <i className="fa-solid fa-cloud-bolt text-3xl"></i>
              <i className="fa-solid fa-leaf text-3xl"></i>
           </div>
        </section>

        <Pricing onStart={onStart} />

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
           <div className="bg-ink rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                 <i className="fa-solid fa-seedling absolute top-10 left-10 text-4xl md:text-5xl text-white"></i>
                 <i className="fa-solid fa-bolt absolute bottom-10 right-10 text-4xl md:text-5xl text-white"></i>
              </div>
              
              <div className="relative z-10 space-y-8 md:space-y-10">
                 <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">
                    Prenez le contrôle <br /> de votre <span className="text-sage">futur numérique.</span>
                 </h2>
                 <button 
                   onClick={onStart}
                   className="bg-sage text-white w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-xl shadow-sage/30 flex items-center justify-center gap-3 mx-auto"
                 >
                   S'inscrire maintenant <i className="fa-solid fa-paper-plane"></i>
                 </button>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 md:py-16 text-center space-y-8 border-t border-ink/5">
         <div className="flex justify-center gap-10 md:gap-12 text-xl text-ink/30">
            <i className="fa-brands fa-linkedin-in hover:text-sage cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-github hover:text-sage cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-x-twitter hover:text-sage cursor-pointer transition-colors"></i>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-ink/20">EcoOrient — 2026</p>
      </footer>
    </div>
  );
};

const MethodStep = ({ icon, step, title, desc, color }: any) => (
  <div className="space-y-3 md:space-y-4 group text-center md:text-left">
     <div className="flex items-end justify-center md:justify-start gap-3 mb-4 md:mb-6">
        <span className="text-2xl md:text-3xl font-serif italic text-ink/20 group-hover:text-sage/40 transition-colors">{step}</span>
        <i className={`fa-solid ${icon} text-xl md:text-2xl ${color} pb-1`}></i>
     </div>
     <h3 className="text-lg md:text-xl font-black text-ink">{title}</h3>
     <p className="text-xs md:text-sm font-medium text-ink/60 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
