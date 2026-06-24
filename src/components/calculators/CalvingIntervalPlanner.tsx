import { useState } from 'react';
import { Info, Target } from 'lucide-react';
import { LivestockTool } from '../../types';

export function CalvingIntervalPlanner({ tool }: { tool: LivestockTool }) {
  const [lastCalvingDate, setLastCalvingDate] = useState(() => {
    const today = new Date();
    today.setMonth(today.getMonth() - 2); // default to 2 months ago
    return today.toISOString().split('T')[0];
  });
  const [desiredInterval, setDesiredInterval] = useState(365);
  const [gestationLength, setGestationLength] = useState(283);
  
  const [result, setResult] = useState<any>(null);

  const calculateInterval = () => {
    const intervalDays = Number(desiredInterval);
    const gestationDays = Number(gestationLength);
    
    if (intervalDays <= 0 || gestationDays <= 0) return;

    const baseDate = new Date(lastCalvingDate);
    
    const targetNextCalvingDate = new Date(baseDate);
    targetNextCalvingDate.setDate(targetNextCalvingDate.getDate() + intervalDays);
    
    const targetRebreedingDate = new Date(targetNextCalvingDate);
    targetRebreedingDate.setDate(targetRebreedingDate.getDate() - gestationDays);
    
    const daysOpen = Math.round((targetRebreedingDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      targetNextCalvingDate: targetNextCalvingDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      targetRebreedingDate: targetRebreedingDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      daysOpen,
      isTight: daysOpen < 45
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
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="lastCalvingDate">
                Last Calving Date
              </label>
              <input 
                id="lastCalvingDate"
                type="date"
                value={lastCalvingDate}
                onChange={(e) => setLastCalvingDate(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="desiredInterval">
                Desired Calving Interval (Days)
              </label>
              <input 
                id="desiredInterval"
                type="number"
                value={desiredInterval}
                onChange={(e) => setDesiredInterval(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="gestationLength">
                Gestation Length (Days)
              </label>
              <input 
                id="gestationLength"
                type="number"
                value={gestationLength}
                onChange={(e) => setGestationLength(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <button 
              onClick={calculateInterval}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Optimize Interval
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            A 365-day calving interval is the industry standard goal to maximize calf crop per year. The cow must rebreed within roughly 80-85 days postpartum to achieve this.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Interval Targets</h3>
          <p className="text-slate-500 text-sm">Target dates to maintain your desired calving interval.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Target Rebreeding Date</div>
                  <div className="text-2xl font-bold text-slate-900 text-blue-600">{result.targetRebreedingDate}</div>
                </div>
                <div className="text-right text-sm">
                  <span className="block text-slate-500">Days Open (Postpartum)</span>
                  <span className={`font-bold text-lg ${result.isTight ? 'text-red-600' : 'text-slate-900'}`}>
                    {result.daysOpen} days
                  </span>
                </div>
              </div>
              <div className="p-6 bg-slate-50">
                <div className="text-sm font-medium text-slate-500 mb-1">Target Next Calving Date</div>
                <div className="text-xl font-bold text-slate-900">{result.targetNextCalvingDate}</div>
              </div>
            </div>

            {result.isTight && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex items-start">
                <Info className="w-5 h-5 text-red-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Warning: Tight Breeding Window</h4>
                  <p className="text-sm text-red-800 leading-relaxed">
                    With only {result.daysOpen} days open, cows may not have sufficient time for uterine involution and to return to estrus. Industry recommendation is typically at least 45-60 days open before rebreeding.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <Target className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No targets yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the last calving date and your interval goals to generate target dates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
