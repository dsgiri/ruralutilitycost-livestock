import { useState } from 'react';
import { Info, Calculator } from 'lucide-react';
import { LivestockTool } from '../../types';

export function CattleAgeEstimator({ tool }: { tool: LivestockTool }) {
  const [weight, setWeight] = useState(500);
  const [frameSize, setFrameSize] = useState('Medium');
  const [sex, setSex] = useState('Heifer');
  const [dentition, setDentition] = useState('None');
  
  const [result, setResult] = useState<{ ageMonths: number, minAge: number, maxAge: number, method: string } | null>(null);

  const calculateAge = () => {
    // Logic based on blueprint
    // Dentition takes priority
    if (dentition !== 'None') {
      let min = 0, max = 0, avg = 0;
      switch(dentition) {
        case 'Temporary (0 permanent)': min = 0; max = 18; avg = 9; break;
        case '2 permanent': min = 18; max = 24; avg = 21; break;
        case '4 permanent': min = 24; max = 36; avg = 30; break;
        case '6 permanent': min = 36; max = 42; avg = 39; break;
        case '8 permanent (Full)': min = 42; max = 60; avg = 51; break;
      }
      setResult({ ageMonths: avg, minAge: min, maxAge: max, method: 'Dentition (Teeth)' });
      return;
    }

    // Weight based calculation
    let birthWeight = 80;
    let adg = 2.0; // Average Daily Gain
    
    if (frameSize === 'Small') { birthWeight = 65; adg = 1.5; }
    else if (frameSize === 'Medium') { birthWeight = 80; adg = 2.0; }
    else if (frameSize === 'Large') { birthWeight = 95; adg = 2.5; }

    if (sex === 'Bull' || sex === 'Steer') { adg += 0.2; birthWeight += 5; }

    let ageDays = (weight - birthWeight) / adg;
    if (ageDays < 0) ageDays = 1; // Minimum 1 day
    
    const ageMonths = ageDays / 30.44;
    setResult({ 
      ageMonths: Math.round(ageMonths * 10) / 10, 
      minAge: Math.max(0, Math.round((ageMonths - 2) * 10) / 10), 
      maxAge: Math.round((ageMonths + 2) * 10) / 10,
      method: 'Weight & Breed'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="weight">
                Current Weight (lbs)
              </label>
              <input 
                id="weight"
                type="number" 
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="frameSize">
                Breed Frame Size
              </label>
              <select 
                id="frameSize"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="sex">
                Sex
              </label>
              <select 
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white"
              >
                <option value="Heifer">Heifer</option>
                <option value="Steer">Steer</option>
                <option value="Bull">Bull</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="dentition">
                Dentition (Optional)
              </label>
              <select 
                id="dentition"
                value={dentition}
                onChange={(e) => setDentition(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white"
              >
                <option value="None">Not provided (Use weight)</option>
                <option value="Temporary (0 permanent)">Temporary (0 permanent)</option>
                <option value="2 permanent">2 permanent teeth</option>
                <option value="4 permanent">4 permanent teeth</option>
                <option value="6 permanent">6 permanent teeth</option>
                <option value="8 permanent (Full)">8 permanent (Full mouth)</option>
              </select>
            </div>

            <button 
              onClick={calculateAge}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Age
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Dentition is the most accurate visual method for estimating age in mature cattle. If dentition is not provided, the calculator uses typical growth curves which may vary by exact breed, feed quality, and health.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Estimated Age</h3>
          <p className="text-slate-500 text-sm">Review the estimated age based on the provided parameters.</p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left flex-1">
                <div className="text-sm font-medium text-slate-500 mb-1">{tool.primaryOutcome}</div>
                <div className="text-4xl font-bold text-slate-900 text-blue-600">
                  {result.ageMonths} <span className="text-xl text-slate-600 font-medium">Months</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Calculation Method: <span className="font-semibold text-slate-700">{result.method}</span>
                </div>
              </div>
              <div className="h-16 w-px bg-slate-200 hidden md:block"></div>
              <div className="text-center md:text-left flex-1">
                <div className="text-sm font-medium text-slate-500 mb-1">Confidence Range</div>
                <div className="text-2xl font-bold text-slate-800">
                  {result.minAge} - {result.maxAge} <span className="text-base text-slate-600 font-medium">Months</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Actual age may vary based on environmental factors
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-2">Understanding the result</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                {result.method === 'Dentition (Teeth)' 
                  ? "Age estimation by dentition provides a range because teeth eruption times vary among individual animals. It is generally the most reliable method for older cattle without records." 
                  : `Based on a starting weight and an expected average daily gain for a ${frameSize} frame ${sex.toLowerCase()}, the age is calculated using standard growth curves. This assumes adequate nutrition and health.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <Calculator className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No calculation yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the cattle parameters and click calculate to see the estimated age and confidence range.</p>
          </div>
        )}
      </div>
    </div>
  );
}
