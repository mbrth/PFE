
import React, { useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">EcoOrient</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Vision</a>
          <a href="#impact" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Impact</a>
          <button 
            onClick={onStart}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md"
          >
            Espace Membre
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setMobileOpen(v => !v)} aria-label="menu" className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-base font-bold text-slate-700 py-2">Vision</a>
            <a href="#impact" className="text-base font-bold text-slate-700 py-2">Impact</a>
            <button onClick={onStart} className="w-full text-left px-4 py-3 bg-slate-900 text-white rounded-xl font-bold">Espace Membre</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest italic">Le futur de l'orientation est là</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Orientez votre carrière vers le <span className="text-indigo-600">Numérique Responsable.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
            La première plateforme d'apprentissage qui fusionne Intelligence Artificielle, mesure d'impact écologique et souveraineté des données.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              Démarrer mon bilan IA <i className="fa-solid fa-bolt-lightning text-amber-300"></i>
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              Découvrir la méthode <i className="fa-solid fa-circle-play text-indigo-600"></i>
            </button>
          </div>
          <div className="pt-8 flex items-center gap-6 border-t border-slate-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100" />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-400">
              <span className="text-slate-900">1,200+ étudiants</span> nous font confiance
            </p>
          </div>
        </div>

        <div className="relative animate-in zoom-in-95 duration-700">
          <div className="bg-gradient-to-br from-indigo-100 to-emerald-50 rounded-[2.5rem] p-8 relative z-10 shadow-inner">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 transform rotate-2">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                   <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                   <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                 </div>
                 <div className="text-[10px] font-black text-slate-300 uppercase">Dashboard Eco-Analytic</div>
               </div>
               <div className="space-y-4">
                 <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
                 <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
                 <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="h-24 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center">
                       <p className="text-2xl font-black text-indigo-600">A+</p>
                       <p className="text-[8px] font-bold uppercase text-indigo-400">Souveraineté</p>
                    </div>
                    <div className="h-24 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center">
                       <p className="text-2xl font-black text-emerald-600">-85%</p>
                       <p className="text-[8px] font-bold uppercase text-emerald-400">Empreinte CO2</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
          {/* Decorative Orbs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/50 rounded-full blur-3xl -z-0 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200/50 rounded-full blur-3xl -z-0"></div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Propulsé par les standards de demain</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-black text-xl text-slate-900"><i className="fa-solid fa-cloud-bolt text-indigo-600"></i> SecNumCloud</div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-900"><i className="fa-solid fa-leaf text-emerald-600"></i> Label NR</div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-900"><i className="fa-solid fa-shield-halved text-blue-600"></i> RGPD Compliant</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
