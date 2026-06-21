export interface TrajectoryPoint {
  id: string;
  time: string;
  location: string;
  lat?: number;
  lng?: number;
  isCrossing: boolean;
  crossingDetails?: {
    fromArea: string;
    toArea: string;
  };
  cameraImage?: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  driverName?: string;
  vehicleType: string;
  lastCapturedAt: string;
  lastLocation: string;
  isSuspected: boolean; // 是否疑似运载疫木
  hasCrossed: boolean; // 是否已跨界
  transportDays: number; // 运输天数
  trajectory: TrajectoryPoint[];
}

export interface Alert {
  id: string;
  vehicleId: string;
  plateNumber: string;
  detectionTime: string;
  captureTime: string; // 抓拍时间
  crossingFrom: string;
  crossingTo: string;
  confidence: number;
  cameraImage: string;
  status: 'pending' | 'resolved';
}
