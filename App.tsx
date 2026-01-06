import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScanLoader from './components/ScanLoader';
import Dashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail';
import { generateWinningProducts } from './services/geminiService';
import { Product } from './types';
import { Search, MonitorPlay, Facebook, Instagram, Hash } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'scanning' | 'dashboard' | 'detail'>('home');
  const [niche, setNiche] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>(['Meta', 'TikTok']);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const handleSearch = async () => {
    if (!niche.trim()) return;
    
    setView('scanning');
    setProducts([]); // Clear previous results
    
    try {
        // Run animation timer and API call in parallel
        // This ensures we wait at least 2.5s for the animation, but don't add extra wait time if API is slow
        const animationPromise = new Promise(resolve => setTimeout(resolve, 2500));
        const apiPromise = generateWinningProducts(niche, selectedSources);
        
        const [_, results] = await Promise.all([animationPromise, apiPromise]);
        
        setProducts(results);
        setView('dashboard');
    } catch (error) {
        console.error("Search process failed:", error);
        // Fallback to dashboard with empty or error state if needed, 
        // but generateWinningProducts should handle its own errors and return fallbacks.
        setView('dashboard');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  return (
    <div className="min-h-screen bg-mapolo-darker text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar onNavigate={(v) => {
        if(v === 'home') {
            setView('home');
            setProducts([]);
        }
      }} />

      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto pb-12">
        
        {view === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in">
            <div className="mb-6 relative">
                 <div className="absolute -inset-1 rounded-full bg-brand-gradient opacity-30 blur-xl"></div>
                 <div className="relative px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase">
                    AI-Powered Dropshipping Tool
                 </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Find Your Next <br/>
              <span className="text-transparent bg-clip-text bg-brand-gradient">Winning Product</span>
            </h1>
            
            <p className="text-slate-400 max-w-2xl text-lg mb-10 leading-relaxed">
              Mapolo scans <span className="text-white font-semibold">Meta Ads Library</span>, <span className="text-white font-semibold">YouTube</span>, and <span className="text-white font-semibold">TikTok</span> to identify high-potential products before they go viral.
            </p>

            <div className="w-full max-w-2xl glass-card p-2 rounded-2xl flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Enter a niche (e.g., 'Pet Supplies', 'Kitchen Gadgets')"
                        className="w-full h-14 bg-slate-900/50 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-transparent focus:border-purple-500/30"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button 
                    onClick={handleSearch}
                    className="h-14 px-8 rounded-xl bg-brand-gradient text-white font-bold text-lg shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.02] active:scale-95"
                >
                    Start Scan
                </button>
            </div>

            {/* Sources Filter */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {[
                    { id: 'Meta', icon: Facebook, color: 'text-blue-500' },
                    { id: 'YouTube', icon: MonitorPlay, color: 'text-red-500' },
                    { id: 'TikTok', icon: Hash, color: 'text-pink-500' }
                ].map((s) => (
                    <button 
                        key={s.id}
                        onClick={() => toggleSource(s.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${selectedSources.includes(s.id) ? 'bg-slate-800 border-purple-500/50 text-white' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                        <s.icon size={18} className={selectedSources.includes(s.id) ? s.color : 'grayscale opacity-50'} />
                        {s.id} Ads
                    </button>
                ))}
            </div>
          </div>
        )}

        {view === 'scanning' && (
          <div className="max-w-2xl mx-auto pt-20">
            <ScanLoader />
          </div>
        )}

        {view === 'dashboard' && (
          <Dashboard 
            products={products} 
            onProductClick={handleProductClick} 
            niche={niche}
          />
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setView('dashboard')} 
          />
        )}

      </main>

      <footer className="w-full border-t border-white/5 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Mapolo AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;