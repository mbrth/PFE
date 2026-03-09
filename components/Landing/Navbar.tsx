
import React, { useState } from 'react';

interface NavbarProps {
  onStart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto px-6 py-6 md:py-10 relative z-50">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-sage rounded-xl flex items-center justify-center text-white shadow-sm shadow-sage/30">
            <i className="fa-solid fa-leaf text-base md:text-lg"></i>
          </div>
          <span className="text-xl md:text-2xl font-black text-ink tracking-tighter">EcoOrient</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-bold text-ink/50 hover:text-sage transition-colors">Notre Vision</a>
          <a href="#" className="text-sm font-bold text-ink/50 hover:text-sage transition-colors">La Méthode</a>
          <button 
            onClick={onStart}
            className="px-6 py-3 bg-white border border-ink/10 text-ink rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:border-ink/20 transition-all"
          >
            Se Connecter
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-ink text-2xl p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-bg border-b border-ink/10 p-6 flex flex-col gap-6 md:hidden shadow-xl shadow-ink/5 animate-in slide-in-from-top-2">
          <a href="#" className="text-lg font-bold text-ink hover:text-sage transition-colors">Notre Vision</a>
          <a href="#" className="text-lg font-bold text-ink hover:text-sage transition-colors">La Méthode</a>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onStart();
            }}
            className="w-full py-4 bg-sage text-white rounded-xl text-base font-bold shadow-md"
          >
            Se Connecter
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
