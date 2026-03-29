
import React, { useState } from 'react';
import { analyzeOnboardingProfile } from '../../services/geminiService';

interface AIOnboardingProps {
  userName: string;
  onComplete: (persona: string) => void;
}

const AIOnboarding: React.FC<AIOnboardingProps> = ({ userName, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    experience: '',
    goal: '',
    priority: '',
    time: ''
  });

  const questions = [
    {
      id: 'experience',
      q: `Bonjour ${userName} ! Quel est votre niveau actuel en développement ?`,
      options: ['Débutant (Je découvre)', 'Intermédiaire (J\'ai déjà des projets)', 'Avancé (Je travaille déjà)']
    },
    {
      id: 'goal',
      q: 'Quel est votre objectif principal sur EcoOrient ?',
      options: ['Apprendre le Green IT', 'Découvrir le Cloud Souverain', 'Améliorer mon employabilité']
    },
    {
      id: 'priority',
      q: 'Qu\'est-ce qui est le plus important pour vous dans un service numérique ?',
      options: ['L\'impact carbone', 'La souveraineté des données', 'La performance pure']
    }
  ];

  const handleAnswer = (ans: string) => {
    const currentId = questions[step].id;
    setAnswers({ ...answers, [currentId]: ans });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleFinalize();
    }
  };

  const handleFinalize = async () => {
    setLoading(true);
    const persona = await analyzeOnboardingProfile(answers);
    setTimeout(() => {
      onComplete(persona);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-ink/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-base-bg">
             <div 
               className="h-full bg-sage transition-all duration-500" 
               style={{ width: `${((step + 1) / questions.length) * 100}%` }}
             ></div>
          </div>

          <div className="mb-12">
             <div className="w-12 h-12 bg-ink text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <i className="fa-solid fa-robot text-xl"></i>
             </div>
             <h2 className="text-3xl font-black text-ink leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500">
                {questions[step].q}
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleAnswer(opt)}
                className="w-full text-left p-6 bg-base-bg hover:bg-ink hover:text-white rounded-2xl font-bold transition-all transform hover:-translate-y-1 active:scale-95 group flex justify-between items-center"
              >
                <span>{opt}</span>
                <i className="fa-solid fa-chevron-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </button>
            ))}
          </div>

          {loading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-sage rounded-3xl flex items-center justify-center text-white text-3xl shadow-2xl shadow-sage/30 animate-bounce mb-8">
                 <i className="fa-solid fa-leaf"></i>
              </div>
              <h3 className="text-2xl font-black text-ink mb-2">Analyse de votre profil...</h3>
              <p className="text-ink/40 font-medium">Le mentor prépare votre parcours personnalisé.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIOnboarding;
