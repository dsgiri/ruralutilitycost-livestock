import { useState } from 'react';
import { Info, CalendarHeart } from 'lucide-react';
import { LivestockTool } from '../../types';

export function BreedingSchedulePlanner({ tool }: { tool: LivestockTool }) {
  const [animalType, setAnimalType] = useState('Cattle');
  const [calcMethod, setCalcMethod] = useState('breedingToBirth');
  const [inputDate, setInputDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [result, setResult] = useState<any>(null);

  const calculateSchedule = () => {
    let gestationDays = 283;
    let weaningDays = 205;
    
    switch (animalType) {
      case 'Cattle': gestationDays = 283; weaningDays = 205; break;
      case 'Sheep': gestationDays = 150; weaningDays = 60; break;
      case 'Goat': gestationDays = 150; weaningDays = 60; break;
      case 'Pig': gestationDays = 114; weaningDays = 21; break;
    }

    const baseDate = new Date(inputDate);
    
    let breedingDate = new Date();
    let birthDate = new Date();
    
    if (calcMethod === 'breedingToBirth') {
      breedingDate = new Date(baseDate);
      birthDate = new Date(baseDate);
      birthDate.setDate(birthDate.getDate() + gestationDays);
    } else {
      birthDate = new Date(baseDate);
      breedingDate = new Date(baseDate);
      breedingDate.setDate(breedingDate.getDate() - gestationDays);
    }
    
    const weaningDate = new Date(birthDate);
    weaningDate.setDate(weaningDate.getDate() + weaningDays);

    setResult({
      breedingDate: breedingDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      birthDate: birthDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      weaningDate: weaningDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      gestationDays,
      weaningDays
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CalendarHeart className="w-5 h-5 mr-2 text-blue-600" />
            Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="animalType">
                Animal Type
              </label>
              <select 
                id="animalType"
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white"
              >
                <option value="Cattle">Cattle</option>
                <option value="Sheep">Sheep</option>
                <option value="Goat">Goat</option>
                <option value="Pig">Pig</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="calcMethod">
                Calculation Method
              </label>
              <select 
                id="calcMethod"
                value={calcMethod}
                onChange={(e) => setCalcMethod(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white"
              >
                <option value="breedingToBirth">I know the Breeding/Insemination Date</option>
                <option value="birthToBreeding">I have a Target Birth Date</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="inputDate">
                {calcMethod === 'breedingToBirth' ? 'Breeding Date' : 'Target Birth Date'}
              </label>
              <input 
                id="inputDate"
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3 min-h-[48px] text-slate-900 bg-white" 
              />
            </div>

            <button 
              onClick={calculateSchedule}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[48px] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Schedule
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Gestation lengths are averages. Normal variation occurs (e.g., cattle can vary from 279 to 287 days). Plan accordingly and monitor animals closely around the expected birth date.
          </p>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Breeding Calendar</h3>
          <p className="text-slate-500 text-sm">Key dates for the reproductive cycle based on average gestation lengths.</p>
        </div>

        {result ? (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Breeding / Insemination Date</div>
                  <div className="text-xl font-bold text-slate-900">{result.breedingDate}</div>
                </div>
                {calcMethod === 'birthToBreeding' && (
                  <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Calculated Date
                  </span>
                )}
              </div>
              
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Expected Birth Date</div>
                  <div className="text-xl font-bold text-blue-600">{result.birthDate}</div>
                </div>
                {calcMethod === 'breedingToBirth' && (
                  <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Calculated Date
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Estimated Weaning Date</div>
                  <div className="text-xl font-bold text-slate-900">{result.weaningDate}</div>
                </div>
                <div className="text-sm text-slate-500">
                  {result.weaningDays} days post-birth
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-1">Gestation Info</h4>
              <p className="text-sm text-blue-800">
                Based on an average gestation length of <strong>{result.gestationDays} days</strong> for {animalType}.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center h-64">
            <CalendarHeart className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No schedule yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Enter the animal type and a date to calculate the breeding schedule.</p>
          </div>
        )}
      </div>
    </div>
  );
}
