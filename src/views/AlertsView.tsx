import { useState, useMemo } from 'react';
import { AlertOctagon, CheckCircle, Clock, MapPin, ArrowRight, Route, Camera, ChevronLeft, ChevronRight, Search, RotateCcw, Filter } from 'lucide-react';
import { mockAlerts, mockVehicles } from '../data/mock';
import { Vehicle, Alert } from '../types';

interface AlertsViewProps {
  onSelectVehicle: (vehicle: Vehicle, alertId?: string) => void;
}

export function AlertsView({ onSelectVehicle }: AlertsViewProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  
  // Advanced query filters
  const [plateQuery, setPlateQuery] = useState('');
  const [originQuery, setOriginQuery] = useState('all');
  const [destQuery, setDestQuery] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleViewTrajectory = (alert: Alert) => {
    const vehicle = mockVehicles.find(v => v.id === alert.vehicleId);
    if (vehicle) {
      onSelectVehicle(vehicle, alert.id);
    }
  };

  const pendingCount = mockAlerts.filter(a => a.status === 'pending').length;
  const resolvedCount = mockAlerts.filter(a => a.status === 'resolved').length;

  // Uniquely extract origin and destination lists from all alerts for dropdown menus
  const uniqueOrigins = useMemo(() => {
    return Array.from(new Set(mockAlerts.map(a => a.crossingFrom))).sort();
  }, []);

  const uniqueDestinations = useMemo(() => {
    return Array.from(new Set(mockAlerts.map(a => a.crossingTo))).sort();
  }, []);

  // Filter alerts based on all query conditions
  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter(alert => {
      // 1. Status Filter
      if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
      
      // 2. Plate Number Query
      if (plateQuery.trim()) {
        const cleanedPlate = plateQuery.trim().toUpperCase();
        if (!alert.plateNumber.toUpperCase().includes(cleanedPlate)) return false;
      }
      
      // 3. Origin Trajectory Filter
      if (originQuery !== 'all' && alert.crossingFrom !== originQuery) return false;
      
      // 4. Destination Trajectory Filter
      if (destQuery !== 'all' && alert.crossingTo !== destQuery) return false;
      
      // 5. Capture Time Filter (Date Range match via captureTime)
      if (startDate || endDate) {
        // alert.captureTime pattern: "2023-10-25 10:00:00" -> extract date portion "2023-10-25"
        const alertDateStr = alert.captureTime.split(' ')[0];
        if (startDate && alertDateStr < startDate) return false;
        if (endDate && alertDateStr > endDate) return false;
      }
      
      return true;
    });
  }, [statusFilter, plateQuery, originQuery, destQuery, startDate, endDate]);

  // Reset all filters back to default
  const handleResetFilters = () => {
    setPlateQuery('');
    setOriginQuery('all');
    setDestQuery('all');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // Pagination bounds
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden w-full">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-slate-200 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 relative shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center">
            跨界告警列表
            <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 animate-pulse">
              系统监测
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 tracking-wide">跨越行政边界异常拉运疫区原木车辆抓拍告警</p>
        </div>
        
        {/* Clickable Filter Segmented Tabs */}
        <div className="flex items-center space-x-3 text-sm font-medium">
          <button 
            onClick={() => { setStatusFilter('all'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center cursor-pointer select-none ${
              statusFilter === 'all' 
                ? 'bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-200' 
                : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
            }`}
          >
            全部告警 ({mockAlerts.length})
          </button>
          
          <button 
            onClick={() => { setStatusFilter('pending'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center cursor-pointer select-none ${
              statusFilter === 'pending' 
                ? 'bg-red-650 text-white border-red-650 shadow-md shadow-red-100' 
                : 'bg-white text-red-700 border-red-200 hover:bg-red-50/50'
            }`}
          >
            <AlertOctagon size={14} className="mr-1.5 shrink-0" />
            待处置 ({pendingCount})
          </button>
          
          <button 
            onClick={() => { setStatusFilter('resolved'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center cursor-pointer select-none ${
              statusFilter === 'resolved' 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100' 
                : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50/50'
            }`}
          >
            <CheckCircle size={14} className="mr-1.5 shrink-0" />
            已结案 ({resolvedCount})
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-8 overflow-y-auto z-10 flex flex-col space-y-6">
        
        {/* Conditions Filter Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm select-none shrink-0">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm mb-4">
            <Filter size={15} className="text-blue-600" />
            <span>告警精确条件检索</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* 车牌号码 */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">车牌号码</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="例：闽F 或 空白"
                  value={plateQuery}
                  onChange={(e) => {
                    setPlateQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 font-mono placeholder:text-slate-400"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* 跨界轨迹-起点 */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">出发地 (跨出区域)</label>
              <select
                value={originQuery}
                onChange={(e) => {
                  setOriginQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有起点 (全部)</option>
                {uniqueOrigins.map(origin => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>

            {/* 跨界轨迹-终点 */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">目的地 (跨入区域)</label>
              <select
                value={destQuery}
                onChange={(e) => {
                  setDestQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有终点 (全部)</option>
                {uniqueDestinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>

            {/* 抓拍时间-开始 */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">开始日期 (抓拍时间)</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            {/* 抓拍时间-结束 */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">结束日期 (抓拍时间)</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Reset Action */}
          {(plateQuery || originQuery !== 'all' || destQuery !== 'all' || startDate || endDate) && (
            <div className="flex justify-end mt-4 pt-1 border-t border-slate-100">
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50/50 hover:border-red-100 border border-slate-200 rounded-lg transition-all font-semibold cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>清除筛选条件</span>
              </button>
            </div>
          )}
        </div>

        {/* List Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-bold text-slate-500 uppercase tracking-wider select-none">
                  <th className="py-4 px-6 text-center w-24">预警编号</th>
                  <th className="py-4 px-6 w-36">车牌号</th>
                  <th className="py-4 px-6 w-32">抓拍图片</th>
                  <th className="py-4 px-6">跨界轨迹</th>
                  <th className="py-4 px-6 w-48">抓拍时间</th>
                  <th className="py-4 px-6 w-48">系统监测时间</th>
                  <th className="py-4 px-6 text-center w-28">识别置信度</th>
                  <th className="py-4 px-6 text-center w-28">处置状态</th>
                  <th className="py-4 px-6 text-right w-36">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400 font-medium">
                      <AlertOctagon size={36} className="mx-auto mb-3 text-slate-300" />
                      当前无对应过滤条件的告警记录
                    </td>
                  </tr>
                ) : (
                  paginatedAlerts.map(alert => (
                    <tr 
                      key={alert.id} 
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* ID */}
                      <td className="py-4 px-6 text-center font-mono text-xs text-slate-400 font-medium">
                        {alert.id}
                      </td>
                      
                      {/* Plate */}
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-50 border border-blue-100 text-blue-700 inline-block font-mono">
                          {alert.plateNumber}
                        </span>
                      </td>
                      
                      {/* Capture Image */}
                      <td className="py-4 px-6">
                        <div className="w-20 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200 cursor-zoom-in group relative">
                          <img 
                            src={alert.cameraImage} 
                            alt="Capture" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                      </td>
                      
                      {/* Cross-boundary Path */}
                      <td className="py-4 px-6 font-medium">
                        <div className="flex items-center space-x-2 text-slate-700">
                          <span className="flex items-center text-red-600 bg-red-50/75 px-3 py-1 rounded border border-red-100 text-xs">
                            <MapPin size={12} className="mr-1 shrink-0" />
                            <span>{alert.crossingFrom}</span>
                          </span>
                          <ArrowRight size={14} className="text-slate-300 shrink-0" />
                          <span className="flex items-center text-red-600 bg-red-50/75 px-3 py-1 rounded border border-red-100 text-xs">
                            <MapPin size={12} className="mr-1 shrink-0" />
                            <span>{alert.crossingTo}</span>
                          </span>
                        </div>
                      </td>
                      
                      {/* Capture Time */}
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        <div className="flex items-center space-x-1.5 font-mono">
                          <Camera size={13} className="text-slate-400" />
                          <span>{alert.captureTime}</span>
                        </div>
                      </td>
                      
                      {/* Monitoring Time */}
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        <div className="flex items-center space-x-1.5 font-mono">
                          <Clock size={13} className="text-slate-400" />
                          <span>{alert.detectionTime}</span>
                        </div>
                      </td>
                      
                      {/* Confidence */}
                      <td className="py-4 px-6 text-center">
                        <span className="font-bold font-mono text-slate-700 text-base">
                          {(alert.confidence * 100).toFixed(1)}<span className="text-[10px] ml-0.5 text-slate-400">%</span>
                        </span>
                      </td>
                      
                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${
                          alert.status === 'pending' ? 'bg-red-50 border-red-100 text-red-600' :
                          'bg-emerald-50 border-emerald-100 text-emerald-600'
                        }`}>
                          {alert.status === 'pending' ? '待处置' : '已结案'}
                        </span>
                      </td>
                      
                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => handleViewTrajectory(alert)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold transition-colors border border-blue-100 cursor-pointer"
                        >
                          <Route size={13} />
                          <span>研判轨迹</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredAlerts.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 select-none shrink-0">
              <div className="text-xs text-slate-500">
                显示第 <span className="font-semibold text-slate-700">{startIndex + 1}</span> 至{" "}
                <span className="font-semibold text-slate-700">{Math.min(endIndex, filteredAlerts.length)}</span> 项 / 共{" "}
                <span className="font-semibold text-slate-700">{filteredAlerts.length}</span> 项告警
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all cursor-pointer"
                  title="上一页"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                        : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all cursor-pointer"
                  title="下一页"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
