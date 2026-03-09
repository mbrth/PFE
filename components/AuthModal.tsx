
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (isNewUser: boolean, name: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(!isLogin, name || 'Apprenant');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Conteneur principal avec le fond noir global pour éviter tout "bleeding" blanc */}
      <div className="w-full max-w-md bg-ink rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* En-tête noir (se fond avec le conteneur parent) */}
        <div className="p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <div className="w-12 h-12 bg-sage rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm shadow-sage/30">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">{isLogin ? 'Bon retour !' : 'Rejoindre EcoOrient'}</h2>
          <p className="text-white/60 text-sm font-medium">
            {isLogin ? 'Accédez à votre espace sécurisé.' : 'Commencez votre orientation responsable.'}
          </p>
        </div>
        
        {/* Formulaire blanc qui vient recouvrir le bas */}
        <div className="bg-white rounded-t-[2rem] p-8 mt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black text-ink/50 uppercase tracking-widest mb-2 ml-1">Nom complet</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jean Dupont" 
                  className="w-full px-5 py-4 bg-base-bg border border-ink/5 rounded-2xl focus:ring-4 focus:ring-sage/20 outline-none transition-all text-sm font-bold text-ink" 
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-ink/50 uppercase tracking-widest mb-2 ml-1">Email professionnel</label>
              <input required type="email" placeholder="nom@entreprise.fr" className="w-full px-5 py-4 bg-base-bg border border-ink/5 rounded-2xl focus:ring-4 focus:ring-sage/20 outline-none transition-all text-sm font-bold text-ink" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-ink/50 uppercase tracking-widest mb-2 ml-1">Mot de passe</label>
              <input required type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-base-bg border border-ink/5 rounded-2xl focus:ring-4 focus:ring-sage/20 outline-none transition-all text-sm font-bold text-ink" />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-sage hover:bg-ink text-white font-black py-5 rounded-2xl shadow-lg shadow-sage/20 transition-all flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                <>{isLogin ? 'Se connecter' : 'Créer mon compte'} <i className="fa-solid fa-arrow-right text-xs"></i></>
              )}
            </button>
            
            <div className="text-center pt-4">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs font-black text-ink/50 hover:text-sage transition-colors uppercase tracking-widest"
              >
                {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
