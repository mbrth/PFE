
import React, { useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
  onVisionImpact: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onVisionImpact }) => {
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
          <button onClick={onVisionImpact} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Vision</button>
          <button onClick={onVisionImpact} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Impact</button>
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
            <button onClick={onVisionImpact} className="text-base font-bold text-slate-700 py-2 hover:text-indigo-600 transition-colors">Vision</button>
            <button onClick={onVisionImpact} className="text-base font-bold text-slate-700 py-2 hover:text-indigo-600 transition-colors">Impact</button>
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

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">Plans adaptés à votre parcours</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
            Investissez dans votre impact.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            De l'exploration individuelle à la transformation d'équipe complète. Choisissez le plan qui correspond à votre ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Explorateur */}
          <div className="group rounded-[2rem] border border-slate-200 p-8 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 bg-white">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Explorateur</h3>
              <p className="text-sm text-slate-500">Pour débuter votre transition</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">Gratuit</span>
                <span className="text-sm text-slate-500">/mois</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Pas de carte bancaire requise</p>
            </div>
            <button className="w-full py-3 px-6 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all mb-8">
              Commencer gratuitement
            </button>
            <div className="space-y-3 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Accès à 50+ formations</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Bilan IA 1x/mois</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Mesure CO2 personnelle</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Certificats numériques</span>
              </div>
              <div className="flex items-center gap-3 opacity-40">
                <i className="fa-solid fa-xmark text-slate-400 text-sm"></i>
                <span className="text-sm text-slate-700">Mentorship personnalisé</span>
              </div>
              <div className="flex items-center gap-3 opacity-40">
                <i className="fa-solid fa-xmark text-slate-400 text-sm"></i>
                <span className="text-sm text-slate-700">API & Intégrations</span>
              </div>
            </div>
          </div>

          {/* Plan Professionnel - Featured */}
          <div className="group rounded-[2rem] border-2 border-indigo-600 p-8 shadow-2xl shadow-indigo-100 transition-all duration-500 bg-gradient-to-br from-indigo-50 to-white relative transform md:scale-105 md:-translate-y-4">
            <div className="absolute -top-4 left-8 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black">RECOMMANDÉ</div>
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Professionnel</h3>
              <p className="text-sm text-slate-600 font-bold">Pour les individus motivés</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-indigo-600">14€</span>
                <span className="text-sm text-slate-600">/mois</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Facturé annuellement : 168€</p>
            </div>
            <button onClick={onStart} className="w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all mb-8 shadow-lg shadow-indigo-200">
              Débuter ma transformation
            </button>
            <div className="space-y-3 border-t border-indigo-200 pt-8">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
                <span className="text-sm text-slate-700"><strong>Tout du plan Explorateur</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
                <span className="text-sm text-slate-700">200+ formations avancées</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
                <span className="text-sm text-slate-700">Bilan IA illimité</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
                <span className="text-sm text-slate-700">Mentorat par experts</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
                <span className="text-sm text-slate-700">Coaching de carrière</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
                <span className="text-sm text-slate-700">Badge "Éco-Architecte"</span>
              </div>
              <div className="flex items-center gap-3 opacity-40">
                <i className="fa-solid fa-xmark text-slate-400 text-sm"></i>
                <span className="text-sm text-slate-700">API & Intégrations</span>
              </div>
            </div>
          </div>

          {/* Plan Entreprise */}
          <div className="group rounded-[2rem] border border-slate-200 p-8 hover:shadow-2xl hover:border-slate-400 transition-all duration-500 bg-white">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Entreprise</h3>
              <p className="text-sm text-slate-500">Pour les équipes de 10+</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">Custom</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">À partir de 500€/mois</p>
            </div>
            <button className="w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all mb-8">
              Demander une démo
            </button>
            <div className="space-y-3 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700"><strong>Tout du plan Pro</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Multicompte & rôles</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Tableaux de bord équipe</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Formation & Onboarding</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">API & Intégrations</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Support prioritaire 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-check text-emerald-500 text-sm"></i>
                <span className="text-sm text-slate-700">Gouvernance & audit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mt-16 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
          <p className="text-slate-700 font-bold mb-2">💡 Conseil pour choisir</p>
          <p className="text-sm text-slate-600">
            <strong>Gratuit</strong> = Explorer l'IA responsable • <strong>Pro</strong> = Accélérer votre transition de carrière • <strong>Entreprise</strong> = Transformer toute votre organisation
          </p>
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
