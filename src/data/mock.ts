import { Vehicle, Alert } from '../types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'v-001',
    plateNumber: '闽F·M9312',
    vehicleType: '重型运木卡车',
    lastCapturedAt: '2023-10-25 14:32:00',
    lastLocation: '连城县庙前镇省道卡口',
    isSuspected: true,
    hasCrossed: true,
    transportDays: 3,
    trajectory: [
      {
        id: 't0_3daysago_1',
        time: '2023-10-22 14:00:00',
        location: '连城县朋口镇福和大道卡口',
        lat: 25.482,
        lng: 116.682,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_3daysago_1/400/300',
      },
      {
        id: 't0_2daysago_2',
        time: '2023-10-23 09:15:00',
        location: '连城县四堡镇中和村监控点',
        lat: 25.895,
        lng: 116.595,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_2daysago/400/300',
      },
      {
        id: 't0_yesterday_1',
        time: '2023-10-24 10:00:00',
        location: '连城县新泉镇西村卡口',
        lat: 25.430,
        lng: 116.650,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_yesterday/400/300',
      },
      {
        id: 't0_yesterday_2',
        time: '2023-10-24 15:30:00',
        location: '连城县林坊镇岗头卡口',
        lat: 25.660,
        lng: 116.710,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_yesterday_2/400/300',
      },
      {
        id: 't1',
        time: '2023-10-25 08:15:00',
        location: '连城县姑田镇林业总站',
        lat: 25.823,
        lng: 116.921,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1/400/300',
      },
      {
        id: 't1_2',
        time: '2023-10-25 09:00:00',
        location: '连城县姑田镇新江村卡口',
        lat: 25.801,
        lng: 116.850,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_2/400/300',
      },
      {
        id: 't1_3',
        time: '2023-10-25 09:50:00',
        location: '连城县揭乐乡后路村卡口',
        lat: 25.750,
        lng: 116.780,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_3/400/300',
      },
      {
        id: 't2',
        time: '2023-10-25 10:45:00',
        location: '连城县莲峰镇城区北环路卡口',
        lat: 25.711,
        lng: 116.758,
        isCrossing: true,
        crossingDetails: { fromArea: '姑田林区保护区', toArea: '莲峰镇管制区' },
        cameraImage: 'https://picsum.photos/seed/truck2/400/300',
      },
      {
        id: 't1_4',
        time: '2023-10-25 11:30:00',
        location: '连城县文亨镇文峰大道卡口',
        lat: 25.790,
        lng: 116.690,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_4/400/300',
      },
      {
        id: 't1_5',
        time: '2023-10-25 13:00:00',
        location: '连城县朋口镇交通主干线卡口',
        lat: 25.480,
        lng: 116.680,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck1_5/400/300',
      },
      {
        id: 't3',
        time: '2023-10-25 14:32:00',
        location: '连城县庙前镇省道卡口',
        lat: 25.419,
        lng: 116.812,
        isCrossing: true,
        crossingDetails: { fromArea: '莲峰镇管制区', toArea: '庙前工业区边界' },
        cameraImage: 'https://picsum.photos/seed/truck3/400/300'
      }
    ]
  },
  {
    id: 'v-002',
    plateNumber: '赣B·KL288',
    vehicleType: '中型货车',
    lastCapturedAt: '2023-10-25 15:10:00',
    lastLocation: '连城县赖源乡林场检测点',
    isSuspected: true,
    hasCrossed: false,
    transportDays: 5,
    trajectory: [
      {
        id: 't4',
        time: '2023-10-25 12:00:00',
        location: '连城县塘前乡林业站捕获点',
        lat: 25.592,
        lng: 116.892,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck4/400/300'
      },
      {
        id: 't4_1',
        time: '2023-10-25 13:10:00',
        location: '连城县塘前乡迪坑村卡口',
        lat: 25.620,
        lng: 116.930,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck4_1/400/300'
      },
      {
        id: 't4_2',
        time: '2023-10-25 14:20:00',
        location: '连城县赖源乡黄地林区哨卡',
        lat: 25.650,
        lng: 116.980,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck4_2/400/300'
      },
      {
        id: 't5',
        time: '2023-10-25 15:10:00',
        location: '连城县赖源乡林场检测点',
        lat: 25.683,
        lng: 117.025,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck5/400/300'
      }
    ]
  },
  {
    id: 'v-003',
    plateNumber: '闽A·9981X',
    vehicleType: '轻型林木运输车',
    lastCapturedAt: '2023-10-25 13:22:00',
    lastLocation: '连城县庙前镇国道卡口',
    isSuspected: true,
    hasCrossed: true,
    transportDays: 2,
    trajectory: [
      {
        id: 't6',
        time: '2023-10-25 09:30:00',
        location: '连城县新泉镇高速出口监控点',
        lat: 25.461,
        lng: 116.634,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck6/400/300'
      },
      {
        id: 't6_1',
        time: '2023-10-25 10:20:00',
        location: '连城县新泉镇西村卡口',
        lat: 25.430,
        lng: 116.650,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck6_1/400/300'
      },
      {
        id: 't6_2',
        time: '2023-10-25 11:45:00',
        location: '连城县朋口镇福和大道卡口',
        lat: 25.482,
        lng: 116.682,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck6_2/400/300'
      },
      {
        id: 't6_3',
        time: '2023-10-25 12:30:00',
        location: '连城县林坊镇岗头卡口',
        lat: 25.660,
        lng: 116.710,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck6_3/400/300'
      },
      {
        id: 't7',
        time: '2023-10-25 13:22:00',
        location: '连城县庙前镇国道卡口',
        lat: 25.421,
        lng: 116.811,
        isCrossing: true,
        crossingDetails: { fromArea: '新泉镇试点区', toArea: '庙前镇检疫点' },
        cameraImage: 'https://picsum.photos/seed/truck7/400/300'
      }
    ]
  },
  {
    id: 'v-004',
    plateNumber: '粤B·LD452',
    vehicleType: '重型半挂牵引车',
    lastCapturedAt: '2023-10-25 16:05:00',
    lastLocation: '连城县四堡镇红盾卡口',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 4,
    trajectory: [
      {
        id: 't8_1',
        time: '2023-10-25 14:15:00',
        location: '连城县四堡镇中和村监控点',
        lat: 25.895,
        lng: 116.595,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck8_1/400/300'
      },
      {
        id: 't8_2',
        time: '2023-10-25 15:00:00',
        location: '连城县四堡镇雾阁林业哨卡',
        lat: 25.875,
        lng: 116.588,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck8_2/400/300'
      },
      {
        id: 't8',
        time: '2023-10-25 16:05:00',
        location: '连城县四堡镇红盾卡口',
        lat: 25.861,
        lng: 116.582,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck8/400/300'
      }
    ]
  },
  {
    id: 'v-005',
    plateNumber: '闽G·A2391',
    vehicleType: '重型柴油卡车',
    lastCapturedAt: '2023-10-25 15:40:00',
    lastLocation: '连城县姑田镇新江村卡口',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 2,
    trajectory: [
      {
        id: 't9_1',
        time: '2023-10-25 14:30:00',
        location: '连城县姑田镇林业总站',
        lat: 25.823,
        lng: 116.921,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck5_1/400/300'
      },
      {
        id: 't9_2',
        time: '2023-10-25 15:40:00',
        location: '连城县姑田镇新江村卡口',
        lat: 25.801,
        lng: 116.850,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck5_2/400/300'
      }
    ]
  },
  {
    id: 'v-006',
    plateNumber: '闽H·K9982',
    vehicleType: '轻型厢式货车',
    lastCapturedAt: '2023-10-25 13:15:00',
    lastLocation: '连城县新泉镇西村卡口',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 1,
    trajectory: [
      {
        id: 't10_1',
        time: '2023-10-25 12:00:00',
        location: '连城县新泉镇高速出口监控点',
        lat: 25.461,
        lng: 116.634,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck6_1/400/300'
      },
      {
        id: 't10_2',
        time: '2023-10-25 13:15:00',
        location: '连城县新泉镇西村卡口',
        lat: 25.430,
        lng: 116.650,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck6_2/400/300'
      }
    ]
  },
  {
    id: 'v-007',
    plateNumber: '粤A·8832Y',
    vehicleType: '大型木材平板车',
    lastCapturedAt: '2023-10-25 11:20:00',
    lastLocation: '连城县文亨镇文峰大道卡口',
    isSuspected: true,
    hasCrossed: true,
    transportDays: 6,
    trajectory: [
      {
        id: 't11_1',
        time: '2023-10-25 08:30:00',
        location: '连城县揭乐乡后路村卡口',
        lat: 25.750,
        lng: 116.780,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck7_1/400/300'
      },
      {
        id: 't11_2',
        time: '2023-10-25 10:00:00',
        location: '连城县莲峰镇城区北环路卡口',
        lat: 25.711,
        lng: 116.758,
        isCrossing: true,
        crossingDetails: { fromArea: '姑田林区保护区', toArea: '莲峰镇管制区' },
        cameraImage: 'https://picsum.photos/seed/truck7_2/400/300'
      },
      {
        id: 't11_3',
        time: '2023-10-25 11:20:00',
        location: '连城县文亨镇文峰大道卡口',
        lat: 25.790,
        lng: 116.690,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck7_3/400/300'
      }
    ]
  },
  {
    id: 'v-008',
    plateNumber: '闽F·Q2931',
    vehicleType: '中型拉木卡车',
    lastCapturedAt: '2023-10-25 16:30:00',
    lastLocation: '连城县林坊镇岗头卡口',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 3,
    trajectory: [
      {
        id: 't12_1',
        time: '2023-10-25 15:10:00',
        location: '连城县朋口镇福和大道卡口',
        lat: 25.482,
        lng: 116.682,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck8_1/400/300'
      },
      {
        id: 't12_2',
        time: '2023-10-25 16:30:00',
        location: '连城县林坊镇岗头卡口',
        lat: 25.660,
        lng: 116.710,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck8_2/400/300'
      }
    ]
  },
  {
    id: 'v-009',
    plateNumber: '浙B·Z8839',
    vehicleType: '重型集装箱牵引车',
    lastCapturedAt: '2023-10-25 10:10:00',
    lastLocation: '连城县四堡镇雾阁林业哨卡',
    isSuspected: true,
    hasCrossed: false,
    transportDays: 4,
    trajectory: [
      {
        id: 't13_1',
        time: '2023-10-25 09:00:00',
        location: '连城县四堡镇中和村监控点',
        lat: 25.895,
        lng: 116.595,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck9_1/400/300'
      },
      {
        id: 't13_2',
        time: '2023-10-25 10:10:00',
        location: '连城县四堡镇雾阁林业哨卡',
        lat: 25.875,
        lng: 116.588,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck9_2/400/300'
      }
    ]
  },
  {
    id: 'v-010',
    plateNumber: '湘A·D9021',
    vehicleType: '中型运木货车',
    lastCapturedAt: '2023-10-25 14:05:00',
    lastLocation: '连城县揭乐乡后路村卡口',
    isSuspected: false,
    hasCrossed: true,
    transportDays: 2,
    trajectory: [
      {
        id: 't14_1',
        time: '2023-10-25 11:30:00',
        location: '连城县姑田镇新江村卡口',
        lat: 25.801,
        lng: 116.850,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck10_1/400/300'
      },
      {
        id: 't14_2',
        time: '2023-10-25 12:45:00',
        location: '连城县莲峰镇城区北环路卡口',
        lat: 25.711,
        lng: 116.758,
        isCrossing: true,
        crossingDetails: { fromArea: '姑田林保护区', toArea: '莲峰管控区' },
        cameraImage: 'https://picsum.photos/seed/truck10_2/400/300'
      },
      {
        id: 't14_3',
        time: '2023-10-25 14:05:00',
        location: '连城县揭乐乡后路村卡口',
        lat: 25.750,
        lng: 116.780,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck10_3/400/300'
      }
    ]
  },
  {
    id: 'v-011',
    plateNumber: '闽D·Y0912',
    vehicleType: '轻型运输货车',
    lastCapturedAt: '2023-10-25 09:12:00',
    lastLocation: '连城县塘前乡迪坑村卡口',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 1,
    trajectory: [
      {
        id: 't15_1',
        time: '2023-10-25 08:00:00',
        location: '连城县塘前乡林业站捕获点',
        lat: 25.592,
        lng: 116.892,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck11_1/400/300'
      },
      {
        id: 't15_2',
        time: '2023-10-25 09:12:00',
        location: '连城县塘前乡迪坑村卡口',
        lat: 25.620,
        lng: 116.930,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck11_2/400/300'
      }
    ]
  },
  {
    id: 'v-012',
    plateNumber: '赣A·S7712',
    vehicleType: '重型加长挂车',
    lastCapturedAt: '2023-10-25 12:45:00',
    lastLocation: '连城县朋口镇交通主干线卡口',
    isSuspected: true,
    hasCrossed: true,
    transportDays: 5,
    trajectory: [
      {
        id: 't16_1',
        time: '2023-10-25 10:15:00',
        location: '连城县林坊镇岗头卡口',
        lat: 25.660,
        lng: 116.710,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck12_1/400/300'
      },
      {
        id: 't16_2',
        time: '2023-10-25 11:30:00',
        location: '连城县朋口镇福和大道卡口',
        lat: 25.482,
        lng: 116.682,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck12_2/400/300'
      },
      {
        id: 't16_3',
        time: '2023-10-25 12:45:00',
        location: '连城县朋口镇交通主干线卡口',
        lat: 25.480,
        lng: 116.680,
        isCrossing: true,
        crossingDetails: { fromArea: '朋口工业区', toArea: '林业防护圈' },
        cameraImage: 'https://picsum.photos/seed/truck12_3/400/300'
      }
    ]
  },
  {
    id: 'v-013',
    plateNumber: '闽C·K8321',
    vehicleType: '小型拉木卡车',
    lastCapturedAt: '2023-10-25 15:50:00',
    lastLocation: '连城县赖源乡黄地林区哨卡',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 3,
    trajectory: [
      {
        id: 't17_1',
        time: '2023-10-25 14:10:00',
        location: '连城县赖源乡林场检测点',
        lat: 25.683,
        lng: 117.025,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck13_1/400/300'
      },
      {
        id: 't17_2',
        time: '2023-10-25 15:50:00',
        location: '连城县赖源乡黄地林区哨卡',
        lat: 25.650,
        lng: 116.980,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck13_2/400/300'
      }
    ]
  },
  {
    id: 'v-014',
    plateNumber: '皖B·E5531',
    vehicleType: '重型拖挂运输车',
    lastCapturedAt: '2023-10-25 16:22:00',
    lastLocation: '连城县庙前镇国道卡口',
    isSuspected: true,
    hasCrossed: true,
    transportDays: 4,
    trajectory: [
      {
        id: 't18_1',
        time: '2023-10-25 13:00:00',
        location: '连城县新泉镇高速出口监控点',
        lat: 25.461,
        lng: 116.634,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck14_1/400/300'
      },
      {
        id: 't18_2',
        time: '2023-10-25 14:15:00',
        location: '连城县朋口镇福和大道卡口',
        lat: 25.482,
        lng: 116.682,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck14_2/400/300'
      },
      {
        id: 't18_3',
        time: '2023-10-25 16:22:00',
        location: '连城县庙前镇国道卡口',
        lat: 25.421,
        lng: 116.811,
        isCrossing: true,
        crossingDetails: { fromArea: '朋口保护圈', toArea: '庙前核心隔离带' },
        cameraImage: 'https://picsum.photos/seed/truck14_3/400/300'
      }
    ]
  },
  {
    id: 'v-015',
    plateNumber: '粤B·77312',
    vehicleType: '中型封闭式货车',
    lastCapturedAt: '2023-10-25 14:55:00',
    lastLocation: '连城县文亨镇文峰大道卡口',
    isSuspected: false,
    hasCrossed: false,
    transportDays: 2,
    trajectory: [
      {
        id: 't19_1',
        time: '2023-10-25 13:20:00',
        location: '连城县揭乐乡后路村卡口',
        lat: 25.750,
        lng: 116.780,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck15_1/400/300'
      },
      {
        id: 't19_2',
        time: '2023-10-25 14:55:00',
        location: '连城县文亨镇文峰大道卡口',
        lat: 25.790,
        lng: 116.690,
        isCrossing: false,
        cameraImage: 'https://picsum.photos/seed/truck15_2/400/300'
      }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alt-1029',
    vehicleId: 'v-001',
    plateNumber: '闽F·M9312',
    detectionTime: '2023-10-25 14:32:00',
    captureTime: '2023-10-25 14:31:55',
    crossingFrom: '莲峰镇管制区',
    crossingTo: '庙前工业区边界',
    confidence: 0.98,
    cameraImage: 'https://picsum.photos/seed/truck3/400/300',
    status: 'pending'
  },
  {
    id: 'alt-1028',
    vehicleId: 'v-003',
    plateNumber: '闽A·9981X',
    detectionTime: '2023-10-25 13:22:00',
    captureTime: '2023-10-25 13:21:40',
    crossingFrom: '新泉镇试点区',
    crossingTo: '庙前镇检疫点',
    confidence: 0.95,
    cameraImage: 'https://picsum.photos/seed/truck7/400/300',
    status: 'pending'
  },
  {
    id: 'alt-1027',
    vehicleId: 'v-007',
    plateNumber: '粤A·8832Y',
    detectionTime: '2023-10-25 10:00:00',
    captureTime: '2023-10-25 09:59:45',
    crossingFrom: '姑田林区保护区',
    crossingTo: '莲峰镇管制区',
    confidence: 0.97,
    cameraImage: 'https://picsum.photos/seed/truck7_2/400/300',
    status: 'pending'
  },
  {
    id: 'alt-1026',
    vehicleId: 'v-010',
    plateNumber: '湘A·D9021',
    detectionTime: '2023-10-25 12:45:00',
    captureTime: '2023-10-25 12:44:30',
    crossingFrom: '姑田林保护区',
    crossingTo: '莲峰管控区',
    confidence: 0.94,
    cameraImage: 'https://picsum.photos/seed/truck10_2/400/300',
    status: 'pending'
  },
  {
    id: 'alt-1025',
    vehicleId: 'v-001',
    plateNumber: '闽F·M9312',
    detectionTime: '2023-10-25 10:45:00',
    captureTime: '2023-10-25 10:44:48',
    crossingFrom: '姑田林区保护区',
    crossingTo: '莲峰镇管制区',
    confidence: 0.99,
    cameraImage: 'https://picsum.photos/seed/truck2/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1024',
    vehicleId: 'v-003',
    plateNumber: '闽A·9981X',
    detectionTime: '2023-10-25 11:05:00',
    captureTime: '2023-10-25 11:04:15',
    crossingFrom: '朋口镇管制区',
    crossingTo: '新泉镇试点区',
    confidence: 0.96,
    cameraImage: 'https://picsum.photos/seed/truck6_2/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1023',
    vehicleId: 'v-012',
    plateNumber: '赣A·S7712',
    detectionTime: '2023-10-25 12:45:00',
    captureTime: '2023-10-25 12:44:10',
    crossingFrom: '朋口工业区',
    crossingTo: '林业防护圈',
    confidence: 0.93,
    cameraImage: 'https://picsum.photos/seed/truck12_3/400/300',
    status: 'pending'
  },
  {
    id: 'alt-1022',
    vehicleId: 'v-007',
    plateNumber: '粤A·8832Y',
    detectionTime: '2023-10-25 07:45:00',
    captureTime: '2023-10-25 07:44:12',
    crossingFrom: '莲峰镇管制区',
    crossingTo: '姑田林区保护区',
    confidence: 0.91,
    cameraImage: 'https://picsum.photos/seed/truck7_1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1021',
    vehicleId: 'v-010',
    plateNumber: '湘A·D9021',
    detectionTime: '2023-10-25 09:30:00',
    captureTime: '2023-10-25 09:29:15',
    crossingFrom: '赖源乡林场',
    crossingTo: '姑田林保护区',
    confidence: 0.92,
    cameraImage: 'https://picsum.photos/seed/truck10_1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1020',
    vehicleId: 'v-001',
    plateNumber: '闽F·M9312',
    detectionTime: '2023-10-25 08:15:00',
    captureTime: '2023-10-25 08:14:00',
    crossingFrom: '四堡林业交警哨卡',
    crossingTo: '新泉镇交检口',
    confidence: 0.95,
    cameraImage: 'https://picsum.photos/seed/truck1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1019',
    vehicleId: 'v-003',
    plateNumber: '闽A·9981X',
    detectionTime: '2023-10-25 08:20:00',
    captureTime: '2023-10-25 08:19:10',
    crossingFrom: '莲峰镇林地中心',
    crossingTo: '朋口镇管制区',
    confidence: 0.89,
    cameraImage: 'https://picsum.photos/seed/truck6/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1018',
    vehicleId: 'v-007',
    plateNumber: '粤A·8832Y',
    detectionTime: '2023-10-24 16:30:00',
    captureTime: '2023-10-24 16:29:18',
    crossingFrom: '姑田林区保护区',
    crossingTo: '庙前林区',
    confidence: 0.94,
    cameraImage: 'https://picsum.photos/seed/truck7_3/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1017',
    vehicleId: 'v-012',
    plateNumber: '赣A·S7712',
    detectionTime: '2023-10-24 14:15:00',
    captureTime: '2023-10-24 14:14:00',
    crossingFrom: '林业防护圈',
    crossingTo: '朋口工业区',
    confidence: 0.90,
    cameraImage: 'https://picsum.photos/seed/truck12_2/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1016',
    vehicleId: 'v-001',
    plateNumber: '闽F·M9312',
    detectionTime: '2023-10-24 11:00:00',
    captureTime: '2023-10-24 10:59:12',
    crossingFrom: '庙前工业区边界',
    crossingTo: '林坊管制站',
    confidence: 0.97,
    cameraImage: 'https://picsum.photos/seed/truck1_yesterday/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1015',
    vehicleId: 'v-003',
    plateNumber: '闽A·9981X',
    detectionTime: '2023-10-24 09:40:00',
    captureTime: '2023-10-24 09:39:15',
    crossingFrom: '西村监测哨站',
    crossingTo: '新泉镇试点区',
    confidence: 0.88,
    cameraImage: 'https://picsum.photos/seed/truck6_1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1014',
    vehicleId: 'v-007',
    plateNumber: '粤A·8832Y',
    detectionTime: '2023-10-23 15:20:00',
    captureTime: '2023-10-23 15:19:00',
    crossingFrom: '文亨镇交口',
    crossingTo: '莲峰镇管制区',
    confidence: 0.91,
    cameraImage: 'https://picsum.photos/seed/truck11_1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1013',
    vehicleId: 'v-010',
    plateNumber: '湘A·D9021',
    detectionTime: '2023-10-23 11:15:00',
    captureTime: '2023-10-23 11:14:05',
    crossingFrom: '新江村卡口',
    crossingTo: '揭乐乡林场',
    confidence: 0.87,
    cameraImage: 'https://picsum.photos/seed/truck10_3/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1012',
    vehicleId: 'v-012',
    plateNumber: '赣A·S7712',
    detectionTime: '2023-10-23 08:30:00',
    captureTime: '2023-10-23 08:29:11',
    crossingFrom: '林坊镇检查站',
    crossingTo: '朋口镇管制区',
    confidence: 0.92,
    cameraImage: 'https://picsum.photos/seed/truck12_1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1011',
    vehicleId: 'v-001',
    plateNumber: '闽F·M9312',
    detectionTime: '2023-10-22 16:45:00',
    captureTime: '2023-10-22 16:44:00',
    crossingFrom: '新泉镇试点区',
    crossingTo: '赖源乡检测站',
    confidence: 0.94,
    cameraImage: 'https://picsum.photos/seed/truck1_2daysago/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1010',
    vehicleId: 'v-003',
    plateNumber: '闽A·9981X',
    detectionTime: '2023-10-22 13:10:00',
    captureTime: '2023-10-22 13:09:12',
    crossingFrom: '朋口镇交检站',
    crossingTo: '莲峰镇林区',
    confidence: 0.89,
    cameraImage: 'https://picsum.photos/seed/truck6_3/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1009',
    vehicleId: 'v-007',
    plateNumber: '粤A·8832Y',
    detectionTime: '2023-10-22 09:20:00',
    captureTime: '2023-10-22 09:19:05',
    crossingFrom: '姑田保护区',
    crossingTo: '前村检疫口',
    confidence: 0.96,
    cameraImage: 'https://picsum.photos/seed/truck7_2/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1008',
    vehicleId: 'v-010',
    plateNumber: '湘A·D9021',
    detectionTime: '2023-10-21 15:55:00',
    captureTime: '2023-10-21 15:54:10',
    crossingFrom: '新镇外接卡口',
    crossingTo: '林区缓冲区',
    confidence: 0.85,
    cameraImage: 'https://picsum.photos/seed/truck10_2/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1007',
    vehicleId: 'v-012',
    plateNumber: '赣A·S7712',
    detectionTime: '2023-10-21 11:40:00',
    captureTime: '2023-10-21 11:39:15',
    crossingFrom: '朋口管控线路',
    crossingTo: '西林大桥哨所',
    confidence: 0.93,
    cameraImage: 'https://picsum.photos/seed/truck12_2/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1006',
    vehicleId: 'v-001',
    plateNumber: '闽F·M9312',
    detectionTime: '2023-10-21 08:15:00',
    captureTime: '2023-10-21 08:14:02',
    crossingFrom: '四堡隔离带',
    crossingTo: '庙前工业区边界',
    confidence: 0.98,
    cameraImage: 'https://picsum.photos/seed/truck1_3daysago_1/400/300',
    status: 'resolved'
  },
  {
    id: 'alt-1005',
    vehicleId: 'v-003',
    plateNumber: '闽A·9981X',
    detectionTime: '2023-10-20 14:30:00',
    captureTime: '2023-10-20 14:29:10',
    crossingFrom: '北环卡口哨卡',
    crossingTo: '姑田镇管制点',
    confidence: 0.92,
    cameraImage: 'https://picsum.photos/seed/truck6/400/300',
    status: 'resolved'
  }
];

// Define a collection of high-quality unsplash images showing vehicles and trucks driving on highway roads
const HIGHWAY_VEHICLE_IMAGES = [
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=75', // Semi truck on scenic highway
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=75', // Truck on open highway road
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=75', // Logistics trailer truck on dry highway
  'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?w=600&auto=format&fit=crop&q=75', // Big truck moving down open highway
  'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&auto=format&fit=crop&q=75', // Delivery vehicle on a scenic forest route
  'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&auto=format&fit=crop&q=75', // Carrier truck on highway sunset
  'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&auto=format&fit=crop&q=75', // High speed road highway traffic
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=75', // Vehicle driving down scenic tree highway
  'https://images.unsplash.com/photo-1516801908819-35492d1dc79d?w=600&auto=format&fit=crop&q=75', // Red freight truck driving on route
  'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=600&auto=format&fit=crop&q=75', // Multi-lane highway road with streaming car headlights
  'https://images.unsplash.com/photo-1515524738708-327f31002921?w=600&auto=format&fit=crop&q=75'  // Sedan vehicle cruising on empty highway
];

// Hash helper for stable deterministic distribution of images by item ID or plate
function getHighwayVehicleImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % HIGHWAY_VEHICLE_IMAGES.length;
  return HIGHWAY_VEHICLE_IMAGES[index];
}

// Map picsum assets to high-quality highway vehicle photography
for (const vehicle of mockVehicles) {
  for (const point of vehicle.trajectory) {
    if (point.cameraImage) {
      point.cameraImage = getHighwayVehicleImage(point.id);
    }
  }
}

for (const alert of mockAlerts) {
  if (alert.cameraImage) {
    alert.cameraImage = getHighwayVehicleImage(alert.id);
  }
}

