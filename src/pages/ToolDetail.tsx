import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { LIVESTOCK_TOOLS } from '../data';
import { Heart, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

// Import all calculators
import { CattleAgeEstimator } from '../components/calculators/CattleAgeEstimator';
import { CattleGrowthTracker } from '../components/calculators/CattleGrowthTracker';
import { HerdFeedRequirementCalculator } from '../components/calculators/HerdFeedRequirementCalculator';
import { BreedingSchedulePlanner } from '../components/calculators/BreedingSchedulePlanner';
import { CalvingIntervalPlanner } from '../components/calculators/CalvingIntervalPlanner';
import { LivestockWeightProjection } from '../components/calculators/LivestockWeightProjection';
import { GoatSheepFeedPlanner } from '../components/calculators/GoatSheepFeedPlanner';
import { PoultryFlockGrowthOverview } from '../components/calculators/PoultryFlockGrowthOverview';

export function ToolDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const tool = LIVESTOCK_TOOLS.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
        <SEO 
          title="Tool Not Found" 
          description="The requested livestock tool could not be found." 
        />
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Tool not found</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex justify-center items-center min-h-[48px]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Livestock Hub
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(tool.id);

  const renderCalculator = () => {
    switch (tool.id) {
      case 'cattle-age-estimator':
        return <CattleAgeEstimator tool={tool} />;
      case 'cattle-growth-tracker':
        return <CattleGrowthTracker tool={tool} />;
      case 'herd-feed-requirement-calculator':
        return <HerdFeedRequirementCalculator tool={tool} />;
      case 'breeding-schedule-planner':
        return <BreedingSchedulePlanner tool={tool} />;
      case 'calving-interval-planner':
        return <CalvingIntervalPlanner tool={tool} />;
      case 'livestock-weight-projection':
        return <LivestockWeightProjection tool={tool} />;
      case 'goat-sheep-feed-planner':
        return <GoatSheepFeedPlanner tool={tool} />;
      case 'poultry-flock-growth-overview':
        return <PoultryFlockGrowthOverview tool={tool} />;
      default:
        return <div>Calculator not found</div>;
    }
  };

  return (
    <div className="w-full flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <SEO 
          title={tool.title} 
          description={tool.description} 
          canonicalPath={`/tools/${tool.id}`}
          isTool={true}
        />
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-6 text-sm min-h-[48px]">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tools
        </Link>
        
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Tool Header */}
          <div className="bg-slate-900 px-6 py-8 border-b border-slate-800 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 mb-4">
                  {tool.category}
                </span>
                <h1 className="text-3xl font-bold tracking-tight mb-2 leading-tight">{tool.title}</h1>
                <p className="text-slate-300 max-w-2xl leading-relaxed text-sm sm:text-base">{tool.description}</p>
              </div>
              <button
                onClick={() => toggleFavorite(tool.id)}
                className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 min-h-[48px] border border-slate-700 rounded-md transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Heart className={`w-5 h-5 mr-2 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                {isFav ? 'Saved' : 'Save Tool'}
              </button>
            </div>
          </div>

          {/* Tool Body */}
          <div className="p-4 sm:p-6 md:p-8">
            {renderCalculator()}
          </div>
        </div>
      </div>
    </div>
  );
}
