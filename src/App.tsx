import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { VehiclesView } from './views/VehiclesView';
import { AlertsView } from './views/AlertsView';
import { TrajectoryView } from './views/TrajectoryView';
import { mockAlerts } from './data/mock';
import { Vehicle } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'vehicles' | 'alerts'>('vehicles');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const pendingAlertsCount = mockAlerts.filter(a => a.status === 'pending').length;

  const handleSelectVehicle = (vehicle: Vehicle, alertId?: string) => {
    setSelectedVehicle(vehicle);
    setSelectedAlertId(alertId || null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {!selectedVehicle && (
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          alertsCount={pendingAlertsCount} 
        />
      )}
      <main className="flex-1 relative h-full overflow-hidden">
        {selectedVehicle ? (
          <TrajectoryView 
            vehicle={selectedVehicle} 
            initialAlertId={selectedAlertId}
            onBack={() => {
              setSelectedVehicle(null);
              setSelectedAlertId(null);
            }} 
          />
        ) : currentView === 'vehicles' ? (
          <VehiclesView onSelectVehicle={handleSelectVehicle} />
        ) : (
          <AlertsView onSelectVehicle={handleSelectVehicle} />
        )}
      </main>
    </div>
  );
}
