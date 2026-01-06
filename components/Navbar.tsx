import React from 'react';
import { ShoppingBag, LayoutGrid, Search, Menu } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="w-full h-16 border-b border-white/10 bg-mapolo-darker/80 backdrop-blur-md fixed top-0 z-50 flex items-center justify-between px-4 md:px-8">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]">
          <ShoppingBag size={18} fill="white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-purple-500 to-indigo-500">
          Mapolo
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Research</button>
        <button className="hover:text-white transition-colors">Saved Products</button>
        <button className="hover:text-white transition-colors">Ad Spy</button>
        <button className="hover:text-white transition-colors">Pricing</button>
      </div>

      {/* User / CTA */}
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors">
            <Search size={16} />
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-white text-sm hover:border-orange-500/50 transition-all shadow-lg shadow-purple-900/20">
          My Account
        </button>
        <button className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
