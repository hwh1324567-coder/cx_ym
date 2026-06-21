import { Divide, LayoutDashboard, ShieldAlert, Truck } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'vehicles' | 'alerts') => void;
  alertsCount: number;
}

export function Sidebar({ currentView, onViewChange, alertsCount }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen text-slate-600 relative overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center space-x-3 relative">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 z-10 shadow-sm">
          <ShieldAlert size={20} />
        </div>
        <h1 className="text-lg font-bold text-slate-800 tracking-wide leading-tight flex flex-col z-10">
          <span>疫木非法调运</span>
          <span className="text-blue-600 text-sm mt-0.5 tracking-widest font-medium">智慧监测平台</span>
        </h1>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-3 z-10">
        <button
          onClick={() => onViewChange('vehicles')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            currentView === 'vehicles'
              ? 'bg-blue-50 text-blue-700 shadow-sm'
              : 'hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Truck size={18} className={currentView === 'vehicles' ? 'text-blue-600' : 'text-slate-400'} />
          <span className="font-medium tracking-wide text-sm text-left flex-1">全时域监测</span>
        </button>

        <button
          onClick={() => onViewChange('alerts')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
            currentView === 'alerts'
              ? 'bg-red-50 text-red-700 shadow-sm'
              : 'hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center space-x-3">
            <LayoutDashboard size={18} className={currentView === 'alerts' ? 'text-red-500' : 'text-slate-400'} />
            <span className="font-medium tracking-wide text-sm text-left">跨界告警</span>
          </div>
          {alertsCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[24px]"
            >
              {alertsCount}
            </motion.span>
          )}
        </button>
      </nav>
    </div>
  );
}
