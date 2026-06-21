import { ArrowLeft, MapPin, AlertCircle, Clock, CheckCircle2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Image as ImageIcon, Scan, Download, Calendar, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Vehicle, TrajectoryPoint, Alert } from '../types';
import { mockAlerts } from '../data/mock';
import { useMemo, useState, useEffect } from 'react';
import React from 'react';

interface TrajectoryViewProps {
  vehicle: Vehicle;
  initialAlertId: string | null;
  onBack: () => void;
}

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

function MapResizer({ isCollapsed }: { isCollapsed: boolean }) {
  const map = useMap();
  useEffect(() => {
    // Delay slightly to allow the CSS width transition to complete
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 310);
    return () => clearTimeout(timer);
  }, [isCollapsed, map]);
  return null;
}

// Custom icon to avoid default missing icon issues in Leaflet with bundlers
const createCustomIcon = (isCrossing: boolean) => 
  L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${isCrossing ? '#ef4444' : '#3b82f6'}; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });

// Custom icon for displaying directional arrows inline on the path
const createArrowIcon = (angle: number) =>
  L.divIcon({
    className: 'custom-leaflet-arrow',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        transform: rotate(${angle}deg);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 15 12 9 18 15"></polyline>
        </svg>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

export function TrajectoryView({ vehicle, initialAlertId, onBack }: TrajectoryViewProps) {
  // Find all unique dates in the trajectory
  const availableDates = useMemo(() => {
    const dates = vehicle.trajectory.map(p => p.time.split(' ')[0]);
    return Array.from(new Set(dates)).sort();
  }, [vehicle.trajectory]);

  // Default to the latest date
  const latestDate = useMemo(() => {
    return availableDates[availableDates.length - 1] || '';
  }, [availableDates]);

  const [startDateStr, setStartDateStr] = useState(latestDate);
  const [endDateStr, setEndDateStr] = useState(latestDate);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(initialAlertId);

  // Sync dates when vehicle change
  useEffect(() => {
    setStartDateStr(latestDate);
    setEndDateStr(latestDate);
  }, [latestDate]);

  // Find all crossing records for this vehicle in mockAlerts
  const vehicleCrossings = useMemo(() => {
    return mockAlerts.filter(a => a.plateNumber === vehicle.plateNumber || a.vehicleId === vehicle.id);
  }, [vehicle.id, vehicle.plateNumber]);

  const [activeCenter, setActiveCenter] = useState<[number, number] | null>(null);

  // Effect to handle initial alert centering/filtering
  useEffect(() => {
    if (initialAlertId) {
      setSelectedAlertId(initialAlertId);
      const alert = mockAlerts.find(a => a.id === initialAlertId);
      if (alert) {
        const alertDate = alert.detectionTime.split(' ')[0];
        setStartDateStr(alertDate);
        setEndDateStr(alertDate);
        
        // Find matching crossing point in trajectory
        const matchPoint = vehicle.trajectory.find(p => 
          p.time === alert.detectionTime || 
          (p.isCrossing && p.crossingDetails?.fromArea === alert.crossingFrom && p.crossingDetails?.toArea === alert.crossingTo)
        );
        if (matchPoint && matchPoint.lat !== undefined && matchPoint.lng !== undefined) {
          setActiveCenter([matchPoint.lat, matchPoint.lng]);
        }
      }
    }
  }, [initialAlertId, vehicle.trajectory]);

  // Selection handler for crossings (One Vehicle, Multiple Crossings support)
  const handleCrossingSelect = (alert: Alert) => {
    setSelectedAlertId(alert.id);
    const alertDate = alert.detectionTime.split(' ')[0];
    setStartDateStr(alertDate);
    setEndDateStr(alertDate);
    
    // Auto-expand filter if collapsed to show active range, or keep as is
    const matchPoint = vehicle.trajectory.find(p => 
      p.time === alert.detectionTime || 
      (p.isCrossing && p.crossingDetails?.fromArea === alert.crossingFrom && p.crossingDetails?.toArea === alert.crossingTo)
    );
    if (matchPoint && matchPoint.lat !== undefined && matchPoint.lng !== undefined) {
      setActiveCenter([matchPoint.lat, matchPoint.lng]);
    }
  };

  // Handler for custom start date update with <= 3-day constraint
  const handleStartDateChange = (val: string) => {
    if (!val) return;
    setStartDateStr(val);
    
    if (endDateStr) {
      const dStart = new Date(val);
      const dEnd = new Date(endDateStr);
      const diffMs = dEnd.getTime() - dStart.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (diffDays < 0) {
        setEndDateStr(val);
      } else if (diffDays > 2) {
        // Clamp to exactly 3 days (start date + 2 days)
        const dTarget = new Date(dStart.getTime() + 2 * 24 * 60 * 60 * 1000);
        const yyyy = dTarget.getFullYear();
        const mm = String(dTarget.getMonth() + 1).padStart(2, '0');
        const dd = String(dTarget.getDate()).padStart(2, '0');
        setEndDateStr(`${yyyy}-${mm}-${dd}`);
      }
    }
  };

  // Handler for custom end date update with <= 3-day constraint
  const handleEndDateChange = (val: string) => {
    if (!val) return;
    setEndDateStr(val);
    
    if (startDateStr) {
      const dStart = new Date(startDateStr);
      const dEnd = new Date(val);
      const diffMs = dEnd.getTime() - dStart.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (diffDays < 0) {
        setStartDateStr(val);
      } else if (diffDays > 2) {
        // Clamp to exactly 3 days (end date - 2 days)
        const dTarget = new Date(dEnd.getTime() - 2 * 24 * 60 * 60 * 1000);
        const yyyy = dTarget.getFullYear();
        const mm = String(dTarget.getMonth() + 1).padStart(2, '0');
        const dd = String(dTarget.getDate()).padStart(2, '0');
        setStartDateStr(`${yyyy}-${mm}-${dd}`);
      }
    }
  };

  // Quick select: single/today
  const setQuickRangeToday = () => {
    setStartDateStr(latestDate);
    setEndDateStr(latestDate);
  };

  // Quick select: 3-day range
  const setQuickRange3Days = () => {
    if (!latestDate) return;
    const dLatest = new Date(latestDate);
    const d3DaysAgo = new Date(dLatest.getTime() - 2 * 24 * 60 * 60 * 1000);
    const yyyy = d3DaysAgo.getFullYear();
    const mm = String(d3DaysAgo.getMonth() + 1).padStart(2, '0');
    const dd = String(d3DaysAgo.getDate()).padStart(2, '0');
    setStartDateStr(`${yyyy}-${mm}-${dd}`);
    setEndDateStr(latestDate);
  };

  // Filtered trajectory points
  const filteredTrajectory = useMemo(() => {
    if (!startDateStr || !endDateStr) return vehicle.trajectory;
    
    return vehicle.trajectory.filter(point => {
      const pointDate = point.time.split(' ')[0];
      return pointDate >= startDateStr && pointDate <= endDateStr;
    });
  }, [vehicle.trajectory, startDateStr, endDateStr]);

  // Extract coordinates for polyline and map bounds
  const pathCoordinates = useMemo(() => {
    return filteredTrajectory
      .filter(p => p.lat !== undefined && p.lng !== undefined)
      .map(p => [p.lat!, p.lng!] as [number, number]);
  }, [filteredTrajectory]);

  // Compute intermediate direction indicators
  const directions = useMemo(() => {
    const arr: { id: string; pos: [number, number]; angle: number }[] = [];
    for (let i = 0; i < pathCoordinates.length - 1; i++) {
      const latA = pathCoordinates[i][0];
      const lngA = pathCoordinates[i][1];
      const latB = pathCoordinates[i + 1][0];
      const lngB = pathCoordinates[i + 1][1];
      
      const midLat = (latA + latB) / 2;
      const midLng = (lngA + lngB) / 2;
      
      // Calculate angle from point A to point B
      const angle = Math.atan2(lngB - lngA, latB - latA) * 180 / Math.PI;
      
      arr.push({
        id: `arrow-${i}`,
        pos: [midLat, midLng],
        angle: angle
      });
    }
    return arr;
  }, [pathCoordinates]);

  const mapCenter = pathCoordinates.length > 0 ? pathCoordinates[0] : [25.71, 116.75] as [number, number];

  const handlePointClick = (point: TrajectoryPoint) => {
    if (point.lat !== undefined && point.lng !== undefined) {
      setActiveCenter([point.lat, point.lng]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden w-full absolute inset-0 z-20">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-slate-200 z-10 flex items-center justify-between shadow-sm relative shrink-0">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="p-2 mr-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {vehicle.plateNumber}
              </h2>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {vehicle.vehicleType}
              </span>
              {vehicle.hasCrossed && (
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                  发生跨界
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-1 tracking-wide flex items-center">
              <Scan size={14} className="mr-1.5" />
              轨迹追踪研判详情
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
           {vehicle.hasCrossed ? (
              <div className="flex items-center text-red-600 font-semibold text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                <AlertCircle size={16} className="mr-1.5" />
                系统检测到跨界运输预警
              </div>
            ) : (
              <div className="flex items-center text-emerald-600 font-semibold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                <CheckCircle2 size={16} className="mr-1.5" />
                控制区活动轨迹正常
              </div>
            )}
           <button className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer">
             <Download size={16} />
             <span>导出报告</span>
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Map Area */}
        <div className={`${isSidebarCollapsed ? "w-full" : "w-2/3"} h-full border-r border-slate-200 bg-slate-100 relative transition-all duration-300`}>
          <MapContainer 
            center={mapCenter} 
            zoom={11} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <MapController center={activeCenter} />
            <MapResizer isCollapsed={isSidebarCollapsed} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pathCoordinates.length > 1 && (
              <Polyline 
                positions={pathCoordinates} 
                color="#3b82f6" 
                weight={4} 
                opacity={0.7} 
                dashArray="10, 10" 
              />
            )}
            {directions.map((arrow) => (
              <Marker
                key={arrow.id}
                position={arrow.pos}
                icon={createArrowIcon(arrow.angle)}
                interactive={false}
              />
            ))}
            {filteredTrajectory.map((point) => {
              if (point.lat && point.lng) {
                return (
                  <Marker 
                    key={point.id} 
                    position={[point.lat, point.lng]} 
                    icon={createCustomIcon(point.isCrossing)}
                  >
                    <Popup className="font-sans">
                      <div className="w-[220px] flex flex-col space-y-2 py-0.5">
                        {point.cameraImage && (
                          <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative">
                            <img 
                              src={point.cameraImage} 
                              alt="监控照片" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                              车辆抓拍
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col space-y-1 text-slate-800">
                          <div className="font-bold text-slate-900 text-sm leading-snug">
                            {point.location}
                          </div>
                          
                          <div className="text-[11px] leading-relaxed">
                            <span className="text-slate-500 font-medium">纬度经度: </span>
                            <span className="font-mono text-blue-600 font-semibold">{point.lat.toFixed(4)}, {point.lng.toFixed(4)}</span>
                          </div>

                          <div className="text-[11px] leading-relaxed">
                            <span className="text-slate-500 font-medium">拍摄时间: </span>
                            <span className="font-mono text-slate-700">{point.time}</span>
                          </div>
                        </div>

                        {point.isCrossing && (
                          <div className="pt-0.5">
                            <span className="inline-block px-1.5 py-0.5 bg-red-50 text-red-700 rounded border border-red-100 text-[10px] font-bold">
                              ⚠️ 跨圈点位抓拍
                            </span>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
          {/* Map Overlay Tooltip */}
          <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-slate-200 pointer-events-none">
            <h3 className="font-semibold text-sm text-slate-800 flex items-center">
              <RouteIcon className="w-4 h-4 mr-2 text-blue-600" />
              卡口行动轨迹网络
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              基于交通探头和卡口抓拍智能还原追踪线索
            </p>
          </div>

          {/* Collapse/Expand Toggle Button */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute top-1/2 -translate-y-1/2 right-0 z-[500] flex items-center justify-center w-6 h-14 bg-white hover:bg-slate-50 border border-r-0 border-slate-200 text-slate-500 hover:text-slate-700 rounded-l-xl shadow-md transition-all cursor-pointer group"
            title={isSidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
          >
            {isSidebarCollapsed ? <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> : <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </div>

        {/* Timeline Side Panel */}
        <div className={`${isSidebarCollapsed ? "w-0 opacity-0 overflow-hidden border-l-0" : "w-1/3 opacity-100"} h-full flex flex-col bg-white border-l border-slate-200 relative transition-all duration-300`}>
          
          {/* One Vehicle, Multiple Crossings Selector Panel */}
          {vehicleCrossings.length > 0 && (
            <div className="p-5 border-b border-slate-200 bg-amber-50/25 shrink-0 select-none">
              <h3 className="font-bold text-xs text-slate-700 flex items-center mb-3">
                <AlertTriangle size={15} className="mr-1.5 text-amber-500" />
                <span>该车历史跨界抓拍 (共 {vehicleCrossings.length} 次)</span>
              </h3>
              <div className="space-y-2 max-h-[145px] overflow-y-auto pr-1">
                {vehicleCrossings.map((crossing, idx) => {
                  const isSelected = selectedAlertId === crossing.id;
                  return (
                    <div 
                      key={crossing.id}
                      onClick={() => handleCrossingSelect(crossing)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all select-none ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50/70 shadow-sm shadow-blue-100/50' 
                          : 'border-slate-150 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className={isSelected ? 'text-blue-700 font-bold' : 'text-slate-700'}>
                          记录 {vehicleCrossings.length - idx}: {crossing.detectionTime}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          crossing.status === 'pending' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {crossing.status === 'pending' ? '未处理' : '已结案'}
                        </span>
                      </div>
                      <div className="flex items-center text-slate-500 mt-2 font-medium">
                        <span className="text-red-600 bg-red-50/50 px-1 rounded">{crossing.crossingFrom}</span>
                        <span className="mx-1.5 text-slate-300">→</span>
                        <span className="text-red-600 bg-red-50/50 px-1 rounded">{crossing.crossingTo}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Time Picker Filter Card */}
          <div className="p-5 bg-slate-50 border-b border-slate-200 shrink-0 select-none">
            <div 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <h3 className="font-bold text-sm text-slate-800 flex items-center">
                <Calendar size={16} className="mr-2 text-blue-600" />
                <span>轨迹时间范围筛选</span>
                {!isFilterExpanded && startDateStr && endDateStr && (
                  <span className="ml-2 text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-mono">
                    {startDateStr === endDateStr ? startDateStr : `${startDateStr} 至 ${endDateStr}`}
                  </span>
                )}
              </h3>
              <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
                {isFilterExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            {isFilterExpanded && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">开始日期</label>
                    <input 
                      type="date" 
                      value={startDateStr}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">结束日期</label>
                    <input 
                      type="date" 
                      value={endDateStr}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                {/* Clamp constraint & Info and helper buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-500 font-medium">
                    起止跨度上限为 <span className="font-bold text-blue-600">3天</span>
                  </div>
                  
                  <div className="flex space-x-1.5">
                    <button 
                      onClick={setQuickRangeToday}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        startDateStr === latestDate && endDateStr === latestDate
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      当天
                    </button>
                    <button 
                      onClick={setQuickRange3Days}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        startDateStr !== latestDate || endDateStr !== latestDate
                          ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm shadow-amber-50'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      3天内
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Timeline points list */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            {/* The vertical timeline dashed/solid guide line */}
            {filteredTrajectory.length > 0 && (
              <div className="absolute top-0 bottom-0 left-[39px] w-[2px] bg-slate-100" />
            )}
            
            <div className="space-y-8 relative">
              {filteredTrajectory.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Calendar size={36} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-sm font-medium">该时间段内无轨迹数据</p>
                  <button 
                    onClick={setQuickRangeToday}
                    className="text-xs text-blue-600 hover:underline mt-3 font-semibold block mx-auto cursor-pointer"
                  >
                    恢复为默认当天轨迹
                  </button>
                </div>
              ) : (
                filteredTrajectory.map((point, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={point.id} 
                    className="flex relative"
                  >
                    {/* Timeline Marker */}
                    <div className="flex-shrink-0 w-8 flex justify-center mt-6">
                      {point.isCrossing ? (
                        <div className="w-4 h-4 rounded-full bg-white border-4 border-red-500 z-10 flex items-center justify-center outline outline-[3px] outline-white shadow-sm" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-blue-500 z-10 outline outline-[3px] outline-white shadow-sm" />
                      )}
                    </div>
                    
                    {/* Content Card */}
                    <div 
                      onClick={() => handlePointClick(point)}
                      className={`ml-8 flex-1 rounded-2xl border p-5 cursor-pointer ${point.isCrossing ? 'border-red-200 bg-red-50/30 hover:border-red-350 hover:shadow-md' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:shadow-md transition-all'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-1.5 w-full">
                          <div className="flex items-center text-slate-500 text-xs font-mono tracking-wide">
                            <Clock size={14} className="mr-1.5 text-slate-400" />
                            {point.time.split(' ')[1]} 
                            <span className="ml-1.5 text-slate-400">{point.time.split(' ')[0]}</span>
                          </div>
                          <div className={`font-semibold flex items-center ${point.isCrossing ? 'text-red-700' : 'text-slate-800'} text-base mt-1`}>
                            <MapPin size={16} className={`mr-2 ${point.isCrossing ? 'text-red-500' : 'text-blue-500'}`} />
                            {point.location}
                          </div>
                        </div>
                      </div>

                      {/* Crossing Alert Detail */}
                      {point.isCrossing && point.crossingDetails && (
                        <div className="mt-4 p-3 bg-white rounded-xl border border-red-100 shadow-sm">
                          <div className="flex items-center text-xs font-bold tracking-wide text-red-600 mb-2">
                            <AlertCircle size={14} className="mr-1.5" />
                            跨界行为预警
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-600 font-medium tracking-wide">
                             <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md truncate" title={point.crossingDetails.fromArea}>{point.crossingDetails.fromArea}</div>
                             <ChevronRight size={16} className="text-slate-300 flex-shrink-0 mx-2" />
                             <div className="bg-red-50 border border-red-100 text-red-700 px-3 py-1.5 rounded-md truncate font-bold" title={point.crossingDetails.toArea}>{point.crossingDetails.toArea}</div>
                          </div>
                        </div>
                      )}

                      {/* Attached Image (if available) */}
                      {point.cameraImage && (
                        <div className="mt-4 relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 block">
                          <img src={point.cameraImage} alt="Traffic camera" className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors pointer-events-none" />
                          <div className="absolute top-2 right-2 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-mono tracking-widest flex items-center">
                            <ImageIcon size={12} className="mr-1.5" /> 监控抓拍
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple internal icon for the tooltip
function RouteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}
