
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-indigo-600 p-6 md:p-8 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <h2 className="text-2xl font-black mb-2">{isLogin ? 'Bon retour !' : 'Rejoignez EcoOrient'}</h2>
          <p className="text-indigo-100 text-sm">
            {isLogin ? 'Accédez à votre espace sécurisé.' : 'Commencez votre orientation responsable.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nom complet</label>
              <input 
                required 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jean Dupont" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" 
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email professionnel</label>
            <input required type="email" placeholder="nom@entreprise.fr" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Mot de passe</label>
            <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              <>{isLogin ? 'Se connecter' : 'Créer un compte'} <i className="fa-solid fa-arrow-right text-xs"></i></>
            )}
          </button>
          
          <div className="text-center mt-6">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
