import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Mock Data
  stats = {
    totalEntered: 145,
    late: 12,
    absent: 5
  };

  deviceStatus = {
    online: 4,
    offline: 1
  };

  recentLogs = [
    { id: 1, name: 'Ahmet Yılmaz', device: 'Ana Kapı ZK-1', time: '08:15', status: 'success' },
    { id: 2, name: 'Ayşe Demir', device: 'Turnike 2', time: '08:22', status: 'success' },
    { id: 3, name: 'Mehmet Kaya', device: 'Ana Kapı ZK-1', time: '08:31', status: 'late' },
    { id: 4, name: 'Zeynep Çelik', device: 'Arka Kapı', time: '08:45', status: 'late' },
    { id: 5, name: 'Can Öz', device: 'Turnike 1', time: '08:50', status: 'late' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Gelecekte ApiService üzerinden mock/gerçek veri yüklenecek ve SignalR bağlanacak
  }
}
