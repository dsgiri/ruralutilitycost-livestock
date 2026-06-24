import { useState } from 'react';
import { Info, Wheat } from 'lucide-react';
import { LivestockTool } from '../../types';

export function GoatSheepFeedPlanner({ tool }: { tool: LivestockTool }) {
  const [animalCount, setAnimalCount] = useState(25);
  const [avgWeight, setAvgWeight] = useState(150);
  const [productionStage, setProductionStage] = useState('Maintenance');
  const [wastePercent, setWastePercent] = useState(15);
  
  const [result, setResult] = useState<any>(null);

  const calculateFeed = () => {
    const numAnimals = Number(animalCount);
    const weight = Number(avgWeight);
    const waste = Number(wastePercent) / 100;
    
    if (numAnimals <= 0 || weight <= 0) return;

    let intakePercent = 0.02; // 2%
    if (productionStage === 'Late Gestation') intakePercent = 0.03; // 3%
    else if (productionStage === 'Lactating') intakePercent = 0.04; // 4%
    
    // Daily Dry Matter Intake (DMI)
    const dailyDmiPerAnimal = weight * intakePercent;
    const totalDailyDmi = dailyDmiPerAnimal * numAnimals;
    
    // Incorporating waste
    const totalDailyFeedNeeded = totalDailyDmi / (1 - waste);
    const totalWeeklyFeedNeeded = totalDailyFeedNeeded * 7;
    const totalMonthlyFeedNeeded = totalDailyFeedNeeded * 30.44;

    setResult({
      dailyDmiPerAnimal: dailyDmiPerAnimal.toFixed(2),
      intakePercent: (intakePercent * 100).toFixed(1),
      totalDailyFeed: Math.round(totalDailyFeedNeeded),
      totalWeeklyFeed: Math.round(totalWeeklyFeedNeeded),
      totalMonthlyFeed: Math.round(totalMonthlyFeedNeeded)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Wheat className="w-5 h-5 mr-2 text-blue-600" />
            Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="animalCount">
                Number of Animals
              </label>
              <input 
                id="animalCount"
                type="number" 
                value={animalCount}
                onChange={(e) => setAnimalCount(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="avgWeight">
                Average Weight (lbs)
              </label>
              <input 
                id="avgWeight"
                type="number" 
                value={avgWeight}
                onChange={(e) => setAvgWeight(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="productionStage">
                Production Stage
              </label>
              <select 
                id="productionStage"
                value={productionStage}
                onChange={(e) => setProductionStage(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white"
              >
                <option value="Maintenance">Maintenance / Dry</option>
                <option value="Late Gestation">Late Gestation</option>
                <option value="Lactating">Lactating</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="wastePercent">
                Estimated Feed Waste (%)
              </label>
              <input 
                id="wastePercent"
                type="number" 
                value={wastePercent}
                onChange={(e) => setWastePercent(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <button 
              onClick={calculateFeed}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Needs
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Small ruminants (sheep/goats) are notorious for wasting hay. Depending on the feeder design, waste can easily exceed 15-20%.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Feed Requirements</h3>
          <p className="text-slate-500 text-sm">Review the estimated volume of forage/feed required for the flock.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">Daily Feed</div>
                <div className="text-2xl font-bold text-slate-900 text-blue-600">
                  {result.totalDailyFeed.toLocaleString()} <span className="text-sm text-slate-600 font-medium">lbs</span>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">Weekly Feed</div>
                <div className="text-2xl font-bold text-slate-900">
                  {result.totalWeeklyFeed.toLocaleString()} <span className="text-sm text-slate-500 font-medium">lbs</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">Monthly Feed</div>
                <div className="text-2xl font-bold text-slate-900">
                  {result.totalMonthlyFeed.toLocaleString()} <span className="text-sm text-slate-500 font-medium">lbs</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-2">Intake Model Details</h4>
              <p className="text-sm text-blue-800">
                At the <strong>{productionStage}</strong> stage, animals require approximately <strong>{result.intakePercent}%</strong> of their body weight in dry matter daily. This equates to <strong>{result.dailyDmiPerAnimal} lbs</strong> per animal per day, not including the {wastePercent}% waste buffer.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <Wheat className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No calculation yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the flock size, average weight, and production stage to calculate requirements.</p>
          </div>
        )}
      </div>
    </div>
  );
}
