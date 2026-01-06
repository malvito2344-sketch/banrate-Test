import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  niche: string;
}

const Dashboard: React.FC<DashboardProps> = ({ products, onProductClick, niche }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">
                Winning Products for <span className="text-transparent bg-clip-text bg-brand-gradient">{niche}</span>
            </h2>
            <p className="text-slate-400">AI Analysis completed. Found {products.length} high-potential items.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all">
            <Sparkles size={16} className="text-yellow-400" />
            Sort by Profit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onProductClick} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
