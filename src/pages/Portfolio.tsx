import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, LayoutGrid, List } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import portfolioMarkdown from '../data/portfolio-sites.md?raw';
import { parsePortfolioMarkdown } from '../utils/portfolioParser';

export function Portfolio() {
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grouped');
  
  const sites = useMemo(() => parsePortfolioMarkdown(portfolioMarkdown), []);
  
  const categories = useMemo(() => {
    const cats = [...new Set(sites.map(s => s.category))];
    // Push Core to top
    return cats.sort((a, b) => {
      if (a === 'Core') return -1;
      if (b === 'Core') return 1;
      return a.localeCompare(b);
    });
  }, [sites]);

  return (
    <div className="w-full flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <SEO 
          title="Ecosystem Portfolio" 
          description="Explore the complete Rural Utility Cost portfolio of agricultural, financial, and predictive tools." 
          canonicalPath="/portfolio"
        />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">Ecosystem Portfolio</h1>
            <p className="text-slate-500 max-w-2xl">
              The Rural Utility Cost network spans multiple specialized subdomains. 
              Discover connected applications for planning, management, and predictive estimations.
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
            <button 
              onClick={() => setViewMode('grouped')}
              className={`flex items-center px-4 py-2 min-h-[44px] rounded-md text-sm font-medium transition-colors ${viewMode === 'grouped' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              aria-pressed={viewMode === 'grouped'}
            >
              <List className="w-4 h-4 mr-2" /> By Category
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center px-4 py-2 min-h-[44px] rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid className="w-4 h-4 mr-2" /> All Sites
            </button>
          </div>
        </div>

        {viewMode === 'grouped' ? (
          <div className="space-y-12">
            {categories.map((category, idx) => {
              const categorySites = sites.filter(s => s.category === category);
              return (
                <section key={category}>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                    {category} <span className="ml-3 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">{categorySites.length}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySites.map(site => (
                      <SiteCard key={site.url} site={site} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map(site => (
              <SiteCard key={site.url} site={site} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SiteCard({ site }: { site: any }) {
  const href = site.url.startsWith('http') ? site.url : `https://${site.url}`;
  const isCurrentApp = site.name === 'Livestock';
  
  return (
    <div className={`bg-white rounded-xl border p-6 flex flex-col h-full transition-all duration-200 ${isCurrentApp ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-200 hover:border-blue-300 hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center">
          {site.name}
          {isCurrentApp && <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Current</span>}
        </h3>
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
          {site.category}
        </span>
      </div>
      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
        {site.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors min-h-[32px]"
          aria-label={`Visit ${site.name} at ${site.url}`}
        >
          {site.url} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </a>
      </div>
    </div>
  );
}
