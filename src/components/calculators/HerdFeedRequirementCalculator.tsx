import { useState } from 'react';
import { Info, Wheat, Scale } from 'lucide-react';
import { LivestockTool } from '../../types';

export function HerdFeedRequirementCalculator({ tool }: { tool: LivestockTool }) {
  const [animalCount, setAnimalCount] = useState(50);
  const [avgWeight, setAvgWeight] = useState(1000);
  const [bodyWeightPercent, setBodyWeightPercent] = useState(2.5);
  const [wastePercent, setWastePercent] = useState(10);
  
  const [result, setResult] = useState<any>(null);

  const calculateFeed = () => {
    const numAnimals = Number(animalCount);
    const weight = Number(avgWeight);
    const intakePercent = Number(bodyWeightPercent) / 100;
    const waste = Number(wastePercent) / 100;
    
    if (numAnimals <= 0 || weight <= 0) return;

    // Daily Dry Matter Intake (DMI)
    const dailyDmiPerAnimal = weight * intakePercent;
    const totalDailyDmi = dailyDmiPerAnimal * numAnimals;
    
    // Incorporating waste
    const totalDailyFeedNeeded = totalDailyDmi / (1 - waste);
    const totalMonthlyFeedNeeded = totalDailyFeedNeeded * 30.44; // Avg days in month

    setResult({
      dailyDmiPerAnimal: Math.round(dailyDmiPerAnimal),
      totalDailyFeed: Math.round(totalDailyFeedNeeded),
      totalMonthlyFeedLbs: Math.round(totalMonthlyFeedNeeded),
      totalMonthlyFeedTons: (totalMonthlyFeedNeeded / 2000).toFixed(1)
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
                Average Animal Weight (lbs)
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
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="bodyWeightPercent">
                Daily Intake (% of Body Weight)
              </label>
              <input 
                id="bodyWeightPercent"
                type="number" 
                step="0.1"
                value={bodyWeightPercent}
                onChange={(e) => setBodyWeightPercent(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
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
              Calculate Feed Needs
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Standard dry matter intake (DMI) for beef cattle is generally ~2% to 3% of body weight depending on forage quality, weather, and gestation/lactation status. Waste can vary significantly based on feeding method (e.g., ring feeders vs. unrolled bales).
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Estimated Feed Requirements</h3>
          <p className="text-slate-500 text-sm">Review the estimated volume of feed required for the herd.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
                  <Scale className="w-4 h-4 mr-2" /> Daily Feed Requirement
                </div>
                <div className="text-3xl font-bold text-slate-900 text-blue-600">
                  {result.totalDailyFeed.toLocaleString()} <span className="text-base text-slate-600 font-medium">lbs / day</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Includes {wastePercent}% waste factor
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
                  <Wheat className="w-4 h-4 mr-2" /> Monthly Feed Requirement
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {result.totalMonthlyFeedTons} <span className="text-base text-slate-500 font-medium">Tons / month</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  {result.totalMonthlyFeedLbs.toLocaleString()} lbs total
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-2">Individual Animal Metrics</h4>
              <p className="text-sm text-blue-800">
                Each animal is estimated to consume <strong>{result.dailyDmiPerAnimal} lbs</strong> of dry matter per day (excluding waste). This assumes a body weight of {avgWeight} lbs and a {bodyWeightPercent}% intake rate.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <Wheat className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No calculation yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the herd size and feed parameters to estimate daily and monthly feed requirements.</p>
          </div>
        )}
      </div>
    </div>
  );
}
