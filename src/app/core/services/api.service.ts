import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly useMock = true; // Gerçek API'ye geçildiğinde false yapılacak

  constructor() {}

  // --- Auth Endpoints ---
  login(credentials: any): Observable<ApiResponse<{ token: string, refreshToken: string }>> {
    if (this.useMock) {
      return of({
        success: true,
        data: { token: 'mock-jwt-token', refreshToken: 'mock-refresh-token' },
        error: null
      }).pipe(delay(500));
    }
    // TODO: HttpClient.post
    return of();
  }

  // --- Employee Endpoints ---
  getEmployees(): Observable<ApiResponse<Employee[]>> {
    if (this.useMock) {
      const mockData: Employee[] = [
        { id: '1', firstName: 'Ahmet', lastName: 'Yılmaz', registrationNumber: '1001', departmentId: 'd1', departmentName: 'IT', status: 'Active', hasBiometric: true },
        { id: '2', firstName: 'Ayşe', lastName: 'Demir', registrationNumber: '1002', departmentId: 'd2', departmentName: 'IK', status: 'Active', hasBiometric: false }
      ];
      return of({
        success: true,
        data: mockData,
        error: null,
        meta: { page: 1, pageSize: 20, total: 2 }
      }).pipe(delay(500));
    }
    // TODO: HttpClient.get
    return of();
  }

  // --- Device Endpoints ---
  getDevices(): Observable<ApiResponse<any[]>> {
    if (this.useMock) {
      const mockDevices = [
        { id: '1', name: 'Ana Kapı ZK-1', ipAddress: '192.168.1.100', port: 4370, brand: 'ZKTeco', status: 'Online', lastHeartbeat: '1 dk önce' },
        { id: '2', name: 'Turnike 2', ipAddress: '192.168.1.101', port: 4370, brand: 'ZKTeco', status: 'Offline', lastHeartbeat: '2 saat önce' }
      ];
      return of({ success: true, data: mockDevices, error: null }).pipe(delay(400));
    }
    return of();
  }

  getDeviceById(id: string): Observable<ApiResponse<any>> {
    if (this.useMock) {
      const mockDevice = { id, name: 'Ana Kapı ZK-1', ipAddress: '192.168.1.100', port: 4370, brand: 'ZKTeco', status: 'Online', lastHeartbeat: '1 dk önce', location: 'Giriş' };
      return of({ success: true, data: mockDevice, error: null }).pipe(delay(300));
    }
    return of();
  }

  addDevice(device: any): Observable<ApiResponse<any>> {
    if (this.useMock) {
      return of({ success: true, data: { ...device, id: '99', status: 'Online' }, error: null }).pipe(delay(800));
    }
    return of();
  }

  testDeviceConnection(ip: string, port: number): Observable<ApiResponse<boolean>> {
    if (this.useMock) {
      // Rastgele success dönelim
      const isSuccess = Math.random() > 0.3;
      return of({ 
        success: isSuccess, 
        data: isSuccess, 
        error: isSuccess ? null : { code: 'CONN_ERR', message: 'Bağlantı zaman aşımına uğradı' } 
      }).pipe(delay(2000)); // Planda belirtilen 2 saniye loading
    }
    return of();
  }

  connectDevice(id: string): Observable<ApiResponse<boolean>> {
    if (this.useMock) {
      return of({ success: true, data: true, error: null }).pipe(delay(1000));
    }
    return of();
  }

  disconnectDevice(id: string): Observable<ApiResponse<boolean>> {
    if (this.useMock) {
      return of({ success: true, data: true, error: null }).pipe(delay(1000));
    }
    return of();
  }

  getDeviceAssignments(id: string): Observable<ApiResponse<any[]>> {
    if (this.useMock) {
      const mockAssigments = [
        { id: 'a1', employeeId: '1', employeeName: 'Ahmet Yılmaz', accessGroupName: 'Tüm Kapılar', timeZoneName: '7/24', syncStatus: 'Synced' },
        { id: 'a2', employeeId: '2', employeeName: 'Ayşe Demir', accessGroupName: 'Sadece Giriş', timeZoneName: 'Mesai Saatleri', syncStatus: 'Pending' }
      ];
      return of({ success: true, data: mockAssigments, error: null }).pipe(delay(500));
    }
    return of();
  }
}
