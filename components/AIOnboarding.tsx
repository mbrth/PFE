
import React, { useState } from 'react';
import { analyzeOnboardingProfile } from '../services/geminiService';

interface AIOnboardingProps {
  userName: string;
  onComplete: (persona: string) => void;
}

const AIOnboarding: React.FC<AIOnboardingProps> = ({ userName, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    skills: '',
    goal: '',
    priority: 'ecology'
  });

  const nextStep = () => setStep(s => s + 1);

  const handleFinish = async () => {
    setLoading(true);
    const persona = await analyzeOnboardingProfile(answers);
    setTimeout(() => {
      setLoading(false);
      onComplete(persona);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-10">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                <i className="fa-solid fa-hand-wave"></i>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bienvenue {userName} !</h2>
              <p className="text-slate-500 leading-relaxed">
                Pour personnaliser votre expérience EcoOrient, nous allons définir votre profil professionnel en quelques secondes grâce à notre IA.
              </p>
              <button onClick={nextStep} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
                C'est parti <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Quelles sont vos compétences actuelles ?</h3>
              <p className="text-sm text-slate-400">Listez vos outils, langages ou domaines de prédilection.</p>
              <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-28 md:h-32 text-sm"
                placeholder="Ex: Python, Gestion de projet, Excel, React..."
                value={answers.skills}
                onChange={e => setAnswers({...answers, skills: e.target.value})}
              />
              <button onClick={nextStep} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                Suivant
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Quel est votre objectif professionnel ?</h3>
              <p className="text-sm text-slate-400">Où vous voyez-vous dans 2 ans ?</p>
              <input 
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                placeholder="Ex: Devenir Architecte Cloud, Spécialiste IA..."
                value={answers.goal}
                onChange={e => setAnswers({...answers, goal: e.target.value})}
              />
              <div className="grid grid-cols-1 gap-3 mt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Priorité majeure :</p>
                <div className="flex gap-2">
                  {['ecology', 'sovereignty', 'performance'].map(p => (
                    <button 
                      key={p}
                      onClick={() => setAnswers({...answers, priority: p as any})}
                      className={`flex-1 py-3 px-2 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                        answers.priority === p ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={nextStep} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                Suivant
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 text-center animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                <i className={`fa-solid ${loading ? 'fa-spinner animate-spin' : 'fa-check'}`}></i>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Analyse IA en cours...</h3>
                <p className="text-slate-500 text-sm">Nous composons votre profil numérique responsable sur mesure.</p>
              </div>
              <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Analyse...' : 'Finaliser mon profil'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIOnboarding;
