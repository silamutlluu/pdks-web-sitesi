import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Device } from '../../core/models/device.model';
import { Employee, Department } from '../../core/models/employee.model'; // assuming these exist
import { AccessGroup, TimeZoneProfile } from '../../core/models/assignment.model';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  assignmentForm: FormGroup;
  
  devices: Device[] = [];
  departments: Department[] = [];
  employees: Employee[] = [];
  accessGroups: AccessGroup[] = [];
  timeZones: TimeZoneProfile[] = [];

  isLoading = false;
  isSubmitting = false;

  constructor() {
    this.assignmentForm = this.fb.group({
      deviceId: ['', Validators.required],
      employeeIds: [[], Validators.required],
      accessGroupId: [''],
      timeZoneProfileId: ['']
    });
  }

  ngOnInit(): void {
    this.loadInitialData();

    // When device changes, load its specific access groups and timezones
    this.assignmentForm.get('deviceId')?.valueChanges.subscribe(deviceId => {
      if (deviceId) {
        this.loadDeviceSpecificData(deviceId);
      } else {
        this.accessGroups = [];
        this.timeZones = [];
      }
    });
  }

  loadInitialData(): void {
    this.isLoading = true;
    
    // Load devices
    this.apiService.getDevices().subscribe(res => {
      if (res.success) this.devices = res.data;
    });

    // Mock load employees for selection
    // Normally we'd fetch departments and employees to build a nice tree select
    // For now we'll just mock it or call apiService if it exists
    this.isLoading = false;
  }

  loadDeviceSpecificData(deviceId: string): void {
    // Mocking specific data for now
    this.accessGroups = [
      { id: '1', name: 'Standart Personel', deviceId, externalGroupCode: '1' },
      { id: '2', name: 'Yönetim', deviceId, externalGroupCode: '2' }
    ];
    this.timeZones = [
      { id: '1', name: 'Hafta İçi 08-18', deviceId },
      { id: '2', name: '7/24 Erişim', deviceId }
    ];
  }

  onSubmit(): void {
    if (this.assignmentForm.invalid) return;

    this.isSubmitting = true;
    const formValue = this.assignmentForm.value;

    console.log('Submitting assignment:', formValue);
    
    // Mock save
    setTimeout(() => {
      this.isSubmitting = false;
      alert('Atama işlemi başlatıldı! (Mock)');
      this.assignmentForm.reset();
    }, 1000);
  }
}
