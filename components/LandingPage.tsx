import React from 'react';
import Navbar from './Landing/Navbar';
import Hero from './Landing/Hero';
import Pricing from './Landing/Pricing';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100">
      <Navbar onStart={onStart} />
      
      <main>
        <Hero onStart={onStart} />
        
        <TrustSection />
        
        <Pricing onStart={onStart} />
      </main>

      <Footer />
    </div>
  );
};

const TrustSection: React.FC = () => (
  <section className="bg-slate-50 py-20 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">
        Powered by tomorrow's standards
      </p>
      <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2 font-black text-xl text-slate-900">
          <i className="fa-solid fa-cloud-bolt text-indigo-600"></i> SecNumCloud
        </div>
        <div className="flex items-center gap-2 font-black text-xl text-slate-900">
          <i className="fa-solid fa-leaf text-emerald-600"></i> NR Label
        </div>
        <div className="flex items-center gap-2 font-black text-xl text-slate-900">
          <i className="fa-solid fa-shield-halved text-blue-600"></i> GDPR Compliant
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-12 border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <i className="fa-solid fa-leaf text-sm"></i>
        </div>
        <span className="text-lg font-black text-slate-900 tracking-tighter">EcoOrient</span>
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        © 2026 EcoOrient • Intelligent Responsible Orientation
      </p>
    </div>
  </footer>
);

export default LandingPage;
