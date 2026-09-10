import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { SignalRService } from '../../../core/services/signalr.service';
import { Device } from '../../../core/models/device.model';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  isLoading = true;
  private apiService = inject(ApiService);
  private signalrService = inject(SignalRService);

  ngOnInit(): void {
    this.loadDevices();
    
    // Start SignalR connection
    this.signalrService.startConnection();

    // Listen to real-time status updates
    this.signalrService.deviceStatus$.subscribe(event => {
      if (event) {
        const index = this.devices.findIndex(d => d.id === event.deviceId);
        if (index > -1) {
          this.devices[index] = {
            ...this.devices[index],
            status: event.status,
            lastHeartbeat: event.lastHeartbeat
          };
        }
      }
    });
  }

  loadDevices(): void {
    this.isLoading = true;
    this.apiService.getDevices().subscribe({
      next: (res) => {
        if (res.success) {
          this.devices = res.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
