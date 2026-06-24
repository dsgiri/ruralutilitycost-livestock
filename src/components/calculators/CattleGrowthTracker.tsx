import { useState } from 'react';
import { Info, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { LivestockTool } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CattleGrowthTracker({ tool }: { tool: LivestockTool }) {
  const [startWeight, setStartWeight] = useState(600);
  const [targetWeight, setTargetWeight] = useState(1200);
  const [adg, setAdg] = useState(2.5);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [result, setResult] = useState<any>(null);

  const calculateGrowth = () => {
    const startWeightNum = Number(startWeight);
    const targetWeightNum = Number(targetWeight);
    const adgNum = Number(adg);
    
    if (adgNum <= 0) return;
    
    const totalGainRequired = targetWeightNum - startWeightNum;
    if (totalGainRequired <= 0) return;

    const daysToFinish = Math.ceil(totalGainRequired / adgNum);
    
    const startD = new Date(startDate);
    const endD = new Date(startD);
    endD.setDate(endD.getDate() + daysToFinish);
    
    // Generate chart data (monthly points)
    const chartData = [];
    const months = Math.ceil(daysToFinish / 30.44);
    
    for (let i = 0; i <= months; i++) {
      const currentDays = Math.min(i * 30.44, daysToFinish);
      const currentWeight = startWeightNum + (currentDays * adgNum);
      const currentDate = new Date(startD);
      currentDate.setDate(currentDate.getDate() + currentDays);
      
      chartData.push({
        name: currentDate.toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
        weight: Math.round(currentWeight),
        days: Math.round(currentDays)
      });
    }

    setResult({
      finishDate: endD.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      daysToFinish,
      totalGainRequired,
      chartData
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="startWeight">
                Starting Weight (lbs)
              </label>
              <input 
                id="startWeight"
                type="number" 
                value={startWeight}
                onChange={(e) => setStartWeight(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="targetWeight">
                Target/Finishing Weight (lbs)
              </label>
              <input 
                id="targetWeight"
                type="number" 
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="adg">
                Expected ADG (lbs/day)
              </label>
              <input 
                id="adg"
                type="number" 
                step="0.1"
                value={adg}
                onChange={(e) => setAdg(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="startDate">
                Start Date
              </label>
              <input 
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white" 
              />
            </div>

            <button 
              onClick={calculateGrowth}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Project Growth
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            ADG (Average Daily Gain) varies significantly based on breed genetics, feed quality (e.g., pasture vs. grain-finished), and weather conditions. Adjust the ADG to reflect your specific operation.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Projected Finish</h3>
          <p className="text-slate-500 text-sm">Review the estimated timeline to reach your target weight.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" /> Finish Date
                </div>
                <div className="text-2xl font-bold text-slate-900 text-blue-600 leading-tight">
                  {result.finishDate}
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  <span className="font-semibold text-slate-700">{result.daysToFinish}</span> days on feed
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
                  <TrendingUp className="w-4 h-4 mr-2" /> Total Gain Required
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {result.totalGainRequired.toLocaleString()} <span className="text-base text-slate-500 font-medium">lbs</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Based on {adg} lbs/day ADG
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
            <TrendingUp className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No projection yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter starting and target weights along with expected ADG to see the growth trajectory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
