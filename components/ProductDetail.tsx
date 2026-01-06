import React from 'react';
import { Product } from '../types';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ArrowLeft, Target, TrendingUp, DollarSign, Facebook, Youtube, Share2, Copy, ExternalLink } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  return (
    <div className="w-full animate-fade-in pb-10">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-2 rounded-2xl">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full aspect-square object-cover rounded-xl shadow-2xl bg-slate-900"
                />
            </div>
            
            <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-slate-400">Selling Price</span>
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-slate-400">Product Cost</span>
                    <span className="text-xl text-slate-300">${product.cost}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Net Profit</span>
                    <span className="text-2xl font-bold text-green-400">${(product.price - product.cost).toFixed(2)}</span>
                </div>
                
                {product.productUrl && (
                  <a 
                    href={product.productUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-xl bg-slate-800 border border-slate-600 text-white font-semibold hover:bg-slate-700 transition-colors"
                  >
                      <ExternalLink size={18} />
                      View Real Listing
                  </a>
                )}

                <button className="w-full py-3 mt-2 rounded-xl bg-brand-gradient text-white font-bold shadow-lg shadow-purple-900/30 hover:scale-105 transition-transform">
                    Find Supplier
                </button>
            </div>
        </div>

        {/* Right Column: Analysis & Charts */}
        <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h1 className="text-4xl font-bold text-white mb-4 relative z-10">{product.name}</h1>
                <p className="text-lg text-slate-300 mb-6 leading-relaxed relative z-10">{product.description}</p>
                
                <div className="flex flex-wrap gap-3">
                    {product.sources.map(s => (
                        <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                             {s === 'Meta' ? <Facebook size={16} className="text-blue-500"/> : 
                              s === 'YouTube' ? <Youtube size={16} className="text-red-500" /> : <Share2 size={16} className="text-pink-500" />}
                             {s} Ads
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Target Audience</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {product.targetAudience}
                    </p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Copy size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Marketing Angle</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {product.marketingAngle}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="text-green-400" /> 
                        Interest Trend
                    </h3>
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span className="text-xs text-slate-400">Projected Growth</span>
                    </div>
                </div>
                
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={product.trendData}>
                            <defs>
                                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                            <YAxis stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#c084fc' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="interest" 
                                stroke="#d946ef" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorInterest)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;