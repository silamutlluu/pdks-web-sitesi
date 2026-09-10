export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  brand: string; // 'ZKTeco' | 'Hikvision' vs.
  status: 'Online' | 'Offline' | 'Connecting';
  lastHeartbeat?: string;
  location?: string;
}

export interface DeviceAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  accessGroupName: string;
  timeZoneName: string;
  syncStatus: 'Pending' | 'Synced' | 'Failed';
}
