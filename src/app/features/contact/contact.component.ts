import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  formData = {
    firstName: '',
    lastName: '',
    company: '',
    employeeCount: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  isSuccess = false;
  isError = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['subject']) {
        this.formData.subject = params['subject'];
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.isError = false;
    this.isSuccess = false;

    // Gerçek API çağrısı (K1 Fazı gereksinimi)
    this.http.post('/api/contact', this.formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.resetForm();
      },
      error: (err) => {
        console.error('Form submission error:', err);
        this.isSubmitting = false;
        this.isError = true;
      }
    });
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      company: '',
      employeeCount: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
