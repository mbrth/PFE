
import React, { useState } from 'react';

interface NavbarProps {
  onStart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto px-6 py-6 md:py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">EcoOrient</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Vision</a>
          <a href="#impact" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Impact</a>
          <button 
            onClick={onStart}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md"
          >
            Member Space
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="menu" 
            className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-6 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-base font-bold text-slate-700 py-2">Vision</a>
            <a href="#impact" className="text-base font-bold text-slate-700 py-2">Impact</a>
            <button onClick={onStart} className="w-full text-left px-4 py-3 bg-slate-900 text-white rounded-xl font-bold">Member Space</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
