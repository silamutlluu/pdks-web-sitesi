import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { timeout } from 'rxjs';

interface Testimonial {
  id: number;
  companyName: string;
  logoUrl?: string;
  quote: string;
  personName: string;
  personTitle: string;
  caseStudyUrl?: string;
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss'
})
export class CaseStudiesComponent implements OnInit {
  private http = inject(HttpClient);
  testimonials: Testimonial[] = [];
  isLoading = true;
  error = '';

  ngOnInit() {
    this.fetchTestimonials();
  }

  fetchTestimonials() {
    this.http.get<Testimonial[]>('/api/v1/testimonials').pipe(
      timeout(5000)
    ).subscribe({
      next: (data) => {
        this.testimonials = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching testimonials:', err);
        this.error = 'Referanslar yüklenirken bir hata oluştu.';
        this.isLoading = false;
      }
    });
  }
}
