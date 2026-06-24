import { useFavorites } from '../hooks/useFavorites';
import { LIVESTOCK_TOOLS } from '../data';
import { ToolCard } from '../components/ui/ToolCard';
import { Link } from 'react-router-dom';
import { HeartCrack } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

export function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  
  const favoriteTools = LIVESTOCK_TOOLS.filter(tool => favorites.includes(tool.id));

  return (
    <div className="w-full flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <SEO 
          title="My Favorite Livestock Tools" 
          description="Access your saved livestock planning and estimation calculators quickly and efficiently." 
          canonicalPath="/favorites"
        />
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-bold text-slate-900">My Favorites</h1>
          <p className="text-slate-500 mt-2">Saved livestock planning and estimation tools.</p>
        </div>

        {favoriteTools.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-12 text-center">
          <HeartCrack className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-700 mb-2">No favorites yet</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            You haven't added any tools to your favorites. Browse the livestock hub and click the heart icon on any tool to save it here for quick access.
          </p>
          <Link 
            to="/" 
            className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Browse Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteTools.map(tool => (
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
      )}
      </div>
    </div>
  );
}
