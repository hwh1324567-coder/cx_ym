import { useState, KeyboardEvent } from 'react';
import { Search, Filter, AlertTriangle, Route } from 'lucide-react';
import { mockVehicles } from '../data/mock';
import { Vehicle } from '../types';

interface VehiclesViewProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export function VehiclesView({ onSelectVehicle }: VehiclesViewProps) {
  const [plateInput, setPlateInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('2023-10-25');
  const [endTimeInput, setEndTimeInput] = useState('2023-10-25');
  const [locationInput, setLocationInput] = useState('');

  const [plateQuery, setPlateQuery] = useState('');
  const [startTimeQuery, setStartTimeQuery] = useState('2023-10-25');
  const [endTimeQuery, setEndTimeQuery] = useState('2023-10-25');
  const [locationQuery, setLocationQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handler for custom start date update with <= 3-day constraint
  const handleStartChange = (val: string) => {
    if (!val) {
      setStartTimeInput('');
      return;
    }
    setStartTimeInput(val);
    
    if (endTimeInput) {
      const dStart = new Date(val);
      const dEnd = new Date(endTimeInput);
      const diffMs = dEnd.getTime() - dStart.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (diffDays < 0) {
        setEndTimeInput(val);
      } else if (diffDays > 2) {
        // Clamp to exactly 3 days (start date + 2 days)
        const dTarget = new Date(dStart.getTime() + 2 * 24 * 60 * 60 * 1000);
        const yyyy = dTarget.getFullYear();
        const mm = String(dTarget.getMonth() + 1).padStart(2, '0');
        const dd = String(dTarget.getDate()).padStart(2, '0');
        setEndTimeInput(`${yyyy}-${mm}-${dd}`);
      }
    }
  };

  // Handler for custom end date update with <= 3-day constraint
  const handleEndChange = (val: string) => {
    if (!val) {
      setEndTimeInput('');
      return;
    }
    setEndTimeInput(val);
    
    if (startTimeInput) {
      const dStart = new Date(startTimeInput);
      const dEnd = new Date(val);
      const diffMs = dEnd.getTime() - dStart.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (diffDays < 0) {
        setStartTimeInput(val);
      } else if (diffDays > 2) {
        // Clamp to exactly 3 days (end date - 2 days)
        const dTarget = new Date(dEnd.getTime() - 2 * 24 * 60 * 60 * 1000);
        const yyyy = dTarget.getFullYear();
        const mm = String(dTarget.getMonth() + 1).padStart(2, '0');
        const dd = String(dTarget.getDate()).padStart(2, '0');
        setStartTimeInput(`${yyyy}-${mm}-${dd}`);
      }
    }
  };

  const handleSearch = () => {
    setPlateQuery(plateInput);
    setStartTimeQuery(startTimeInput);
    setEndTimeQuery(endTimeInput);
    setLocationQuery(locationInput);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleReset = () => {
    setPlateInput('');
    setStartTimeInput('2023-10-25');
    setEndTimeInput('2023-10-25');
    setLocationInput('');
    setPlateQuery('');
    setStartTimeQuery('2023-10-25');
    setEndTimeQuery('2023-10-25');
    setLocationQuery('');
    setCurrentPage(1); // Reset to first page on reset
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredVehicles = mockVehicles.filter(v => {
    const matchPlate = v.plateNumber.toLowerCase().includes(plateQuery.toLowerCase());
    const matchLocation = v.lastLocation.toLowerCase().includes(locationQuery.toLowerCase());
    
    const lastDateOnly = v.lastCapturedAt.split(' ')[0]; // YYYY-MM-DD
    
    let matchTime = true;
    if (startTimeQuery && endTimeQuery) {
      matchTime = lastDateOnly >= startTimeQuery && lastDateOnly <= endTimeQuery;
    } else if (startTimeQuery) {
      matchTime = lastDateOnly >= startTimeQuery;
    } else if (endTimeQuery) {
      matchTime = lastDateOnly <= endTimeQuery;
    }
    
    return matchPlate && matchTime && matchLocation;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden w-full">
      <div className="px-8 py-6 bg-white border-b border-slate-200 z-10 relative">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">运木车辆全时域监测</h1>
        <p className="text-slate-500 text-sm mt-1 tracking-wide">公安天网与林业布控分析</p>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-600 tracking-wider">车牌号码</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索车牌号..."
                  value={plateInput}
                  onChange={(e) => setPlateInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm placeholder:text-slate-400 text-slate-900"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-bold text-slate-600 tracking-wider">最后出没时间 (最长3天)</label>
              <div className="flex items-center space-x-2 w-full">
                <input 
                  type="date" 
                  value={startTimeInput}
                  onChange={(e) => handleStartChange(e.target.value)}
                  className="w-full flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-xs text-slate-900 min-h-[38px] cursor-pointer"
                />
                <span className="text-slate-400 text-xs shrink-0">至</span>
                <input 
                  type="date" 
                  value={endTimeInput}
                  onChange={(e) => handleEndChange(e.target.value)}
                  className="w-full flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-xs text-slate-900 min-h-[38px] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-600 tracking-wider">最后出没地点</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索地点 (如: 连城县)..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm placeholder:text-slate-400 text-slate-900"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 lg:h-[38px]">
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center space-x-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm h-[38px]"
            >
              <Search size={16} />
              <span>搜索</span>
            </button>
            <button 
              onClick={handleReset}
              className="flex items-center justify-center space-x-2 px-5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-700 transition-colors shadow-sm h-[38px]"
            >
              <Filter size={16} />
              <span>重置</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto z-10 flex flex-col justify-between">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative flex flex-col flex-1">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse relative">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">车牌号码</th>
                  <th className="px-6 py-4">车辆类型</th>
                  <th className="px-6 py-4 text-center">运输天数</th>
                  <th className="px-6 py-4">最后出没时间</th>
                  <th className="px-6 py-4">最后出没地点</th>
                  <th className="px-6 py-4 text-center">跨界预警</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                        {vehicle.plateNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{vehicle.vehicleType}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {vehicle.transportDays} 天
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{vehicle.lastCapturedAt}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{vehicle.lastLocation}</td>
                    <td className="px-6 py-4 text-center">
                       {vehicle.hasCrossed ? (
                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                            <AlertTriangle size={14} className="mr-1.5" /> 已跨界
                          </span>
                       ) : (
                          <span className="text-slate-400 text-sm">-</span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onSelectVehicle(vehicle)}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Route size={16} className="mr-1.5" />
                        查看轨迹
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredVehicles.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                暂未搜索到符合要求的车辆数据
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between bg-slate-50 gap-4 mt-auto">
              <div className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
                显示第 <span className="font-semibold text-slate-700">{startIndex + 1}</span> 到{" "}
                <span className="font-semibold text-slate-700">
                  {Math.min(startIndex + itemsPerPage, filteredVehicles.length)}
                </span>{" "}
                条记录，共 <span className="font-semibold text-slate-700">{filteredVehicles.length}</span> 条
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none text-xs font-medium text-slate-600 transition-colors shadow-sm cursor-pointer"
                >
                  上一页
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center border cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none text-xs font-medium text-slate-600 transition-colors shadow-sm cursor-pointer"
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
