import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { timeout } from 'rxjs';

interface PageData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  
  isLoading = true;
  error = '';
  pageTitle = 'Hakkımızda';
  safeContent: SafeHtml | null = null;

  ngOnInit() {
    this.http.get<PageData>('/api/v1/pages/hakkimizda').pipe(
      timeout(5000)
    ).subscribe({
      next: (data) => {
        this.pageTitle = data.title;
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.content);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching about page:', err);
        // Fallback for visual testing if API is empty or errors out
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml('<p>Şirket hikayesi, misyon ve vizyonumuz çok yakında burada olacak.</p>');
        this.isLoading = false;
      }
    });
  }
}
