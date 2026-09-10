import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Device, DeviceAssignment } from '../../../core/models/device.model';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent implements OnInit {
  device: Device | null = null;
  assignments: DeviceAssignment[] = [];
  
  isLoading = true;
  isConnecting = false;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDeviceDetails(id);
      this.loadAssignments(id);
    }
  }

  loadDeviceDetails(id: string) {
    this.apiService.getDeviceById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.device = res.data;
        }
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  loadAssignments(id: string) {
    this.apiService.getDeviceAssignments(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.assignments = res.data;
        }
      }
    });
  }

  reconnect() {
    if (!this.device) return;
    this.isConnecting = true;
    this.apiService.connectDevice(this.device.id).subscribe({
      next: (res) => {
        this.isConnecting = false;
        if (res.success && this.device) {
          this.device.status = 'Online';
          this.device.lastHeartbeat = 'Şimdi';
        }
      },
      error: () => this.isConnecting = false
    });
  }

  disconnect() {
    if (!this.device) return;
    if(confirm('Bağlantıyı kesmek istediğinize emin misiniz?')) {
      this.isConnecting = true;
      this.apiService.disconnectDevice(this.device.id).subscribe({
        next: (res) => {
          this.isConnecting = false;
          if (res.success && this.device) {
            this.device.status = 'Offline';
          }
        },
        error: () => this.isConnecting = false
      });
    }
  }
}
