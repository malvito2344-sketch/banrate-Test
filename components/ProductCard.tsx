import React from 'react';
import { Product } from '../types';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)]"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-1">
           <Activity size={12} className="text-green-400" />
           {product.viralityScore}/100 Viral
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-brand-gradient transition-all">
            {product.name}
            </h3>
        </div>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
            {product.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-2 text-center border border-white/5">
                <span className="block text-xs text-slate-500 uppercase tracking-wider">Price</span>
                <span className="block font-semibold text-white">${product.price}</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 text-center border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
                <span className="block text-xs text-slate-500 uppercase tracking-wider">Profit</span>
                <span className="block font-semibold text-green-400">${(product.price - product.cost).toFixed(2)}</span>
            </div>
        </div>

        <div className="flex items-center gap-2">
            {product.sources.map((source) => (
                <span key={source} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {source}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
