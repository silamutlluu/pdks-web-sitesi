import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-device-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './device-wizard.component.html',
  styleUrl: './device-wizard.component.css'
})
export class DeviceWizardComponent {
  currentStep = 1;
  deviceForm: FormGroup;
  
  isTesting = false;
  testResult: 'none' | 'success' | 'error' = 'none';
  testErrorMsg = '';

  isSaving = false;

  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  public router = inject(Router);

  constructor() {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$')]],
      port: [4370, [Validators.required, Validators.min(1), Validators.max(65535)]],
      brand: ['ZKTeco', Validators.required]
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.deviceForm.valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.testResult === 'success') {
      this.currentStep = 3;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  testConnection() {
    this.isTesting = true;
    this.testResult = 'none';
    
    const { ipAddress, port } = this.deviceForm.value;
    
    this.apiService.testDeviceConnection(ipAddress, port).subscribe({
      next: (res) => {
        this.isTesting = false;
        if (res.success) {
          this.testResult = 'success';
        } else {
          this.testResult = 'error';
          this.testErrorMsg = res.error?.message || 'Bağlantı hatası';
        }
      },
      error: () => {
        this.isTesting = false;
        this.testResult = 'error';
        this.testErrorMsg = 'Sunucuya ulaşılamadı';
      }
    });
  }

  saveDevice() {
    this.isSaving = true;
    this.apiService.addDevice(this.deviceForm.value).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res.success) {
          this.router.navigate(['/devices']);
        }
      },
      error: () => {
        this.isSaving = false;
        alert('Cihaz kaydedilirken hata oluştu.');
      }
    });
  }
}
