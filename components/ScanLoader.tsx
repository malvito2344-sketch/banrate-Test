import React from 'react';

const ScanLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-96 gap-6 relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5">
        
      <div className="relative w-32 h-32">
        {/* Ripples */}
        <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border-2 border-purple-500/40 animate-ping [animation-delay:0.2s]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-brand-gradient blur-xl opacity-50 animate-pulse"></div>
            <img 
                src="https://picsum.photos/100/100?random=loader" 
                className="w-12 h-12 rounded-lg object-cover z-10 border border-white/20 relative"
                alt="Scanning"
            />
        </div>
      </div>

      <div className="text-center z-10">
        <h3 className="text-xl font-bold text-white mb-2">Scanning Networks...</h3>
        <div className="flex flex-col gap-1 text-sm text-slate-400">
            <span className="animate-pulse">Checking Meta Ads Library...</span>
            <span className="animate-pulse [animation-delay:0.5s]">Analyzing TikTok Trends...</span>
            <span className="animate-pulse [animation-delay:1s]">Calculating Profit Margins...</span>
        </div>
      </div>

      {/* Scan Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_20px_#f97316] animate-[scan_2s_ease-in-out_infinite]"></div>
      
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ScanLoader;
