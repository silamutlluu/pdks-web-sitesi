export interface AccessGroup {
  id: string;
  name: string;
  deviceId: string;
  externalGroupCode: string;
}

export interface TimeZoneProfile {
  id: string;
  name: string;
  deviceId: string;
  rulesJson?: string;
}

export type SyncStatus = 'Pending' | 'Synced' | 'Failed';

export interface EmployeeDeviceAssignment {
  id: string;
  employeeId: string;
  employeeName?: string;
  deviceId: string;
  deviceName?: string;
  accessGroupId?: string;
  accessGroupName?: string;
  timeZoneProfileId?: string;
  timeZoneProfileName?: string;
  syncStatus: SyncStatus;
  lastSyncedAt?: string;
}
