import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DeviceStatusEvent {
  deviceId: string;
  status: 'Online' | 'Offline';
  lastHeartbeat: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private platformId = inject(PLATFORM_ID);
  
  // Observables for components to subscribe
  private deviceStatusSubject = new BehaviorSubject<DeviceStatusEvent | null>(null);
  public deviceStatus$ = this.deviceStatusSubject.asObservable();

  public startConnection(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // SSR sırasında SignalR bağlantısı açma
    }

    if (this.hubConnection) {
      return; // Already connected or connecting
    }

    // Gerçek API url'si kullanılacağı zaman environment.apiUrl üzerinden alınacak.
    // Şimdilik mock bir adrese bağlanıp (ya da mock simülasyon) hata vermeden devam edeceğiz.
    // backend URL'i genelde environment'ta tanımlıdır
    const hubUrl = environment.apiUrl ? `${environment.apiUrl}/hubs/devices` : 'http://localhost:5000/hubs/devices';

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Hub Connection Started');
        this.addListeners();
      })
      .catch(err => {
        console.error('Error while starting SignalR connection', err);
        // Fallback for mock environments (so UI still works even without backend)
        this.simulateMockEvents();
      });
  }

  private addListeners(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('DeviceStatusChanged', (data: DeviceStatusEvent) => {
      this.deviceStatusSubject.next(data);
    });
  }

  // Sadece mock/geliştirme amaçlı rastgele tetikleme (gerçek backend yoksa)
  private simulateMockEvents() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
      // Mock event
      const mockEvent: DeviceStatusEvent = {
        deviceId: '1', // Ana Kapı ZK-1
        status: Math.random() > 0.5 ? 'Online' : 'Offline',
        lastHeartbeat: new Date().toLocaleTimeString()
      };
      this.deviceStatusSubject.next(mockEvent);
    }, 10000); // Her 10 saniyede bir durum değişikliği atar
    }
  }
}
