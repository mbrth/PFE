
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
    // Simulate processing time for better UX
    setTimeout(() => {
      setLoading(false);
      onComplete(persona);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center p-4 md:p-6 text-ink font-sans">
      <div className="bg-white max-w-2xl w-full rounded-[3rem] shadow-xl border border-ink/5 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-ink/5 w-full">
          <div 
            className="h-full bg-sage transition-all duration-700 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-sage/20 text-sage rounded-[2rem] flex items-center justify-center text-3xl mb-8">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Bienvenue {userName} !</h2>
              <p className="text-ink/60 text-lg font-medium leading-relaxed">
                Pour personnaliser votre expérience EcoOrient, nous allons définir votre profil professionnel et vos objectifs d'impact en quelques secondes.
              </p>
              <button onClick={nextStep} className="w-full py-5 bg-ink text-white rounded-2xl font-black shadow-lg hover:bg-sage transition-all text-lg flex items-center justify-center gap-3">
                C'est parti <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                 <h3 className="text-3xl font-black tracking-tight">Quelles sont vos compétences actuelles ?</h3>
                 <p className="text-ink/50 font-medium">Listez vos langages, frameworks ou domaines d'expertise.</p>
              </div>
              <textarea 
                className="w-full p-6 bg-base-bg border border-ink/5 rounded-[2rem] focus:ring-4 focus:ring-sage/20 outline-none h-32 md:h-40 text-base font-bold text-ink resize-none transition-all"
                placeholder="Ex: React, Python, Cloud Architecture, Data Science..."
                value={answers.skills}
                onChange={e => setAnswers({...answers, skills: e.target.value})}
              />
              <button onClick={nextStep} disabled={!answers.skills.trim()} className="w-full py-5 bg-ink text-white rounded-2xl font-black hover:bg-sage transition-all disabled:opacity-30 disabled:hover:bg-ink">
                Continuer
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                 <h3 className="text-3xl font-black tracking-tight">Quel est votre objectif pro ?</h3>
                 <p className="text-ink/50 font-medium">Où vous voyez-vous dans 2 ans ?</p>
              </div>
              <input 
                type="text"
                className="w-full p-6 bg-base-bg border border-ink/5 rounded-[2rem] focus:ring-4 focus:ring-sage/20 outline-none text-base font-bold text-ink transition-all"
                placeholder="Ex: Devenir Lead Dev IA, Architecte Cloud Souverain..."
                value={answers.goal}
                onChange={e => setAnswers({...answers, goal: e.target.value})}
              />
              <div className="grid grid-cols-1 gap-4 mt-6">
                <p className="text-[10px] font-black text-ink/40 uppercase tracking-widest">Priorité Majeure :</p>
                <div className="flex gap-3">
                  {[
                    { id: 'ecology', label: 'Écologie', icon: 'fa-leaf' },
                    { id: 'sovereignty', label: 'Souveraineté', icon: 'fa-shield-halved' },
                    { id: 'performance', label: 'Performance IA', icon: 'fa-microchip' }
                  ].map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setAnswers({...answers, priority: p.id as any})}
                      className={`flex-1 py-4 px-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border flex flex-col items-center gap-2 ${
                        answers.priority === p.id ? 'bg-sage text-white border-sage shadow-lg shadow-sage/30' : 'bg-white text-ink/50 border-ink/10 hover:border-sage/50 hover:text-sage'
                      }`}
                    >
                      <i className={`fa-solid ${p.icon} text-lg`}></i>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={nextStep} disabled={!answers.goal.trim()} className="w-full py-5 bg-ink text-white rounded-2xl font-black hover:bg-sage transition-all mt-4 disabled:opacity-30 disabled:hover:bg-ink">
                Continuer
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 text-center animate-in fade-in zoom-in-95 py-10">
              <div className="w-24 h-24 bg-sage/20 text-sage rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-inner">
                <i className={`fa-solid ${loading ? 'fa-circle-notch animate-spin' : 'fa-check'}`}></i>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-ink">Analyse en cours...</h3>
                <p className="text-ink/50 font-medium">Nous générons votre parcours d'apprentissage sur-mesure.</p>
              </div>
              <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full py-5 bg-ink text-white rounded-2xl font-black hover:bg-sage transition-all disabled:opacity-50 text-lg"
              >
                {loading ? 'Création de l\'environnement...' : 'Accéder au Dashboard'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIOnboarding;
