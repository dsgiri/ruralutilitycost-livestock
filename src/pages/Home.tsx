import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { LIVESTOCK_TOOLS, ToolCategory } from '../data';
import { ToolCard } from '../components/ui/ToolCard';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';

export function Home() {
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(LIVESTOCK_TOOLS.map(t => t.category)))];
  
  const favoriteTools = LIVESTOCK_TOOLS.filter(tool => favorites.includes(tool.id));

  const displayedTools = activeCategory === 'All' 
    ? LIVESTOCK_TOOLS 
    : LIVESTOCK_TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC]">
      <SEO 
        title="Livestock Planning & Animal Estimators" 
        description="A professional livestock hub for managing herd planning, cattle growth estimations, and feed breeding schedules. Built to optimize agricultural operations."
        canonicalPath="/"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] border-b border-slate-200">
        <div className="p-6">
          <h1 className="m-0 text-[24px] font-bold text-slate-900">
            Agricultural Hub
          </h1>
          <p className="mt-2 text-[14px] text-slate-500 max-w-[600px] leading-relaxed">
            Manage livestock planning, growth estimations, and herd breeding schedules. Use precision tools to optimize feed requirements and production outcomes across the rural landscape.
          </p>
        </div>
      </div>

      {/* Main content grid approx tracking `220px 1fr 220px` conceptually */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto p-5 overflow-hidden flex flex-col lg:flex-row gap-5">
        
        {/* Sidebar categories (Left) */}
        <div className="w-full lg:w-[220px] shrink-0 flex flex-row overflow-x-auto lg:flex-col gap-2 lg:gap-1 pb-4 lg:pb-0 scrollbar-hide" role="navigation" aria-label="Tool Categories">
          <div className="hidden lg:block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">
            Categories
          </div>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap min-h-[48px] lg:min-h-0 flex-shrink-0 text-left px-4 lg:px-3 py-2.5 rounded-md text-[14px] flex items-center gap-2.5 transition-colors border-none ${activeCategory === cat ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-[#2563EB] font-semibold' : 'bg-transparent text-slate-600 hover:bg-white/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Center Canvas */}
        <div className="flex-1 w-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedTools.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isFavorite={isFavorite(tool.id)} 
                onToggleFavorite={(e) => {
                  e.preventDefault();
                  toggleFavorite(tool.id);
                }} 
              />
            ))}
          </div>
        </div>

        {/* Favorites Panel (Right) */}
        <div className="w-full lg:w-[220px] shrink-0 bg-white border border-slate-200 p-4 rounded-xl lg:rounded-none lg:border-y-0 lg:border-r-0 lg:border-l">
          <div className="text-[13px] font-bold text-slate-900 mb-3">
            My Favorites
          </div>
          {favoriteTools.length === 0 ? (
            <div className="text-[12px] text-slate-500 italic">No favorites yet.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {favoriteTools.map(tool => (
                <div key={tool.id} className="text-[12px] p-2.5 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9]">
                  <div className="font-semibold text-slate-800 line-clamp-1">{tool.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Saved tool</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
