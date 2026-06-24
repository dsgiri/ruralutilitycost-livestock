import { useState } from 'react';
import { Info, BarChart3, Calendar } from 'lucide-react';
import { LivestockTool } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function LivestockWeightProjection({ tool }: { tool: LivestockTool }) {
  const [currentWeight, setCurrentWeight] = useState(800);
  const [targetDate, setTargetDate] = useState(() => {
    const today = new Date();
    today.setMonth(today.getMonth() + 3); // 3 months out
    return today.toISOString().split('T')[0];
  });
  const [expectedAdg, setExpectedAdg] = useState(2.2);
  
  const [result, setResult] = useState<any>(null);

  const calculateProjection = () => {
    const weight = Number(currentWeight);
    const adg = Number(expectedAdg);
    
    if (weight <= 0 || adg <= 0) return;

    const today = new Date();
    const target = new Date(targetDate);
    
    // Reset time portions for accurate day calc
    today.setHours(0,0,0,0);
    target.setHours(0,0,0,0);

    const days = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return;

    const weightGain = days * adg;
    const projectedFinalWeight = weight + weightGain;

    // Generate chart data (up to 10 points depending on days)
    const chartData = [];
    const numPoints = Math.min(10, days);
    const step = days / numPoints;
    
    for (let i = 0; i <= numPoints; i++) {
      const currentDays = Math.round(i * step);
      const curWeight = weight + (currentDays * adg);
      const curDate = new Date(today);
      curDate.setDate(curDate.getDate() + currentDays);
      
      chartData.push({
        name: curDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        weight: Math.round(curWeight)
      });
    }

    setResult({
      projectedFinalWeight: Math.round(projectedFinalWeight),
      totalWeightGained: Math.round(weightGain),
      days,
      chartData
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="currentWeight">
                Current Weight (lbs)
              </label>
              <input 
                id="currentWeight"
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="expectedAdg">
                Expected ADG (lbs/day)
              </label>
              <input 
                id="expectedAdg"
                type="number"
                step="0.1"
                value={expectedAdg}
                onChange={(e) => setExpectedAdg(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="targetDate">
                Target Date
              </label>
              <input 
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white" 
              />
            </div>

            <button 
              onClick={calculateProjection}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Predict Weight
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Unlike the Growth Tracker which calculates time from a target weight, this tool projects the weight at a specific future date, useful for market planning and sales dates.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Weight Forecast</h3>
          <p className="text-slate-500 text-sm">Review the estimated weight at your target date.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
                  <BarChart3 className="w-4 h-4 mr-2" /> Projected Final Weight
                </div>
                <div className="text-3xl font-bold text-slate-900 text-blue-600">
                  {result.projectedFinalWeight.toLocaleString()} <span className="text-base text-slate-600 font-medium">lbs</span>
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">
                  + {result.totalWeightGained.toLocaleString()} lbs total gain
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" /> Timeframe
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {result.days} <span className="text-base text-slate-500 font-medium">days</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  From today until target date
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-4">{tool.primaryOutcome}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={result.chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                      formatter={(value: number) => [`${value} lbs`, 'Weight']}
                    />
                    <Area type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <BarChart3 className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No forecast yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the current weight and target date to forecast the expected weight.</p>
          </div>
        )}
      </div>
    </div>
  );
}
