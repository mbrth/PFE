
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
        
        <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
          Guide your career towards <span className="text-indigo-600">Responsible Tech.</span>
        </h1>
        
        <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
          The first learning platform merging Artificial Intelligence, ecological impact measurement, and data sovereignty.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            Start my AI assessment <i className="fa-solid fa-bolt-lightning text-amber-300"></i>
          </button>
          <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            Discover the method <i className="fa-solid fa-circle-play text-indigo-600"></i>
          </button>
        </div>
        
        <div className="pt-8 flex items-center gap-6 border-t border-slate-100">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i} 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                className="w-10 h-10 rounded-full border-2 border-white bg-slate-100" 
                alt="user avatar"
              />
            ))}
          </div>
          <p className="text-xs font-bold text-slate-400">
            <span className="text-slate-900">1,200+ students</span> trust us
          </p>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="relative animate-in zoom-in-95 duration-700">
        <div className="bg-gradient-to-br from-indigo-100 to-emerald-50 rounded-[2.5rem] p-8 relative z-10 shadow-inner">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 transform rotate-2">
             <div className="flex items-center justify-between mb-6">
               <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                 <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
               </div>
               <div className="text-[10px] font-black text-slate-300 uppercase">Eco-Analytic Dashboard</div>
             </div>
             
             <div className="space-y-4">
               <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
               <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
               <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="h-24 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center text-center">
                     <p className="text-2xl font-black text-indigo-600">A+</p>
                     <p className="text-[8px] font-bold uppercase text-indigo-400">Sovereignty</p>
                  </div>
                  <div className="h-24 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                     <p className="text-2xl font-black text-emerald-600">-85%</p>
                     <p className="text-[8px] font-bold uppercase text-emerald-400">CO2 Footprint</p>
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
  );
};

export default Hero;
