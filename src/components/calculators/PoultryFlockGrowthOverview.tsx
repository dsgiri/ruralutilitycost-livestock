import { useState } from 'react';
import { Info, Target } from 'lucide-react';
import { LivestockTool } from '../../types';

export function PoultryFlockGrowthOverview({ tool }: { tool: LivestockTool }) {
  const [flockSize, setFlockSize] = useState(500);
  const [targetWeight, setTargetWeight] = useState(6.0); // lbs
  const [fcr, setFcr] = useState(1.8);
  const [mortality, setMortality] = useState(5);
  
  const [result, setResult] = useState<any>(null);

  const calculateFlock = () => {
    const size = Number(flockSize);
    const weight = Number(targetWeight);
    const expectedFcr = Number(fcr);
    const mortRate = Number(mortality) / 100;
    
    if (size <= 0 || weight <= 0 || expectedFcr <= 0) return;

    const harvestFlockSize = size * (1 - mortRate);
    const totalFinalWeight = harvestFlockSize * weight;
    const totalFeedRequired = totalFinalWeight * expectedFcr;

    setResult({
      harvestFlockSize: Math.round(harvestFlockSize),
      totalFinalWeight: Math.round(totalFinalWeight),
      totalFeedRequired: Math.round(totalFeedRequired),
      feedTons: (totalFeedRequired / 2000).toFixed(2),
      mortalityLoss: Math.round(size * mortRate)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="flockSize">
                Starting Flock Size (Birds)
              </label>
              <input 
                id="flockSize"
                type="number" 
                value={flockSize}
                onChange={(e) => setFlockSize(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="targetWeight">
                Target Harvest Weight (lbs/bird)
              </label>
              <input 
                id="targetWeight"
                type="number"
                step="0.1"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="fcr">
                Expected Feed Conversion Ratio (FCR)
              </label>
              <input 
                id="fcr"
                type="number" 
                step="0.05"
                value={fcr}
                onChange={(e) => setFcr(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="mortality">
                Expected Mortality Rate (%)
              </label>
              <input 
                id="mortality"
                type="number"
                step="0.5"
                value={mortality}
                onChange={(e) => setMortality(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <button 
              onClick={calculateFlock}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Metrics
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            FCR represents pounds of feed required to produce one pound of meat. Modern broilers typically achieve 1.5 to 1.8 FCR, while heritage breeds may be 2.5+.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Flock Projections</h3>
          <p className="text-slate-500 text-sm">Review expected meat yield and total feed requirements.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">Total Feed Required</div>
                <div className="text-3xl font-bold text-slate-900 text-blue-600">
                  {result.totalFeedRequired.toLocaleString()} <span className="text-base text-slate-600 font-medium">lbs</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  ({result.feedTons} Tons)
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">Total Expected Yield (Live Weight)</div>
                <div className="text-3xl font-bold text-slate-900">
                  {result.totalFinalWeight.toLocaleString()} <span className="text-base text-slate-500 font-medium">lbs</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  From {result.harvestFlockSize} birds at harvest
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-2">Flock Survivability</h4>
              <p className="text-sm text-blue-800">
                Assuming a {mortality}% mortality rate, you can expect to lose approximately <strong>{result.mortalityLoss} birds</strong> throughout the cycle. Calculations for meat yield and final feed intake factor this loss into the outcome.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <Target className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No projection yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the flock details, target weight, and expected FCR to project your total yields and feed costs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
