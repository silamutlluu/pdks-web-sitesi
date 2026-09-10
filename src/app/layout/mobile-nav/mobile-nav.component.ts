import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeatureCategoryDto, ApiResponse, getBadgeColorHex } from '../features-mega-menu/features-mega-menu.component';
import { SECTORS_DATA, SectorMenu } from '../solutions-mega-menu/solutions-mega-menu.component';
import { FEATURE_CATEGORIES, FEATURES_DATA } from '../../core/data/features.data';
import { MobileNavService } from '../../core/services/mobile-nav.service';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss'
})
export class MobileNavComponent implements OnInit {
  private http = inject(HttpClient);
  private mobileNavService = inject(MobileNavService);
  private cdr = inject(ChangeDetectorRef);
  
  isOpen = false;
  isFeaturesAccordionOpen = false;
  isSolutionsAccordionOpen = false;
  categories: FeatureCategoryDto[] = [];
  sectors: SectorMenu[] = SECTORS_DATA;
  
  getColor = getBadgeColorHex;
  
  getFragment(url: string): string {
    if (!url) return '';
    if (url.includes('#')) {
      return url.split('#').pop() || '';
    }
    return url.split('/').pop() || '';
  }

  ngOnInit() {
    // Servis üzerinden aç/kapat durumunu dinle
    this.mobileNavService.isOpen$.subscribe(state => {
      this.isOpen = state;
      this.cdr.detectChanges();
    });

    const fallbackData: FeatureCategoryDto[] = FEATURE_CATEGORIES.map((cat, index) => {
      const colorMap: Record<string, string> = {
        '#3b82f6': 'blue',
        '#10b981': 'emerald',
        '#8b5cf6': 'violet',
        '#f59e0b': 'amber',
        '#64748b': 'slate',
        '#ec4899': 'pink'
      };
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        badgeColor: colorMap[cat.colorHex] || 'slate',
        displayOrder: index,
        features: FEATURES_DATA.filter(f => f.category === cat.slug).map(f => ({
          id: f.id,
          title: f.title,
          description: f.shortDescription,
          iconKey: f.icon,
          linkUrl: `/features#${f.slug}`
        }))
      };
    });

    this.http.get<ApiResponse<FeatureCategoryDto[]>>('/api/v1/feature-categories').pipe(
      timeout(5000),
      catchError(err => of({ success: true, data: fallbackData }))
    ).subscribe(res => {
      this.categories = res.data || [];
    });
  }

  closeNav() {
    this.mobileNavService.close();
  }
  
  toggleFeaturesAccordion(event: Event) {
    event.preventDefault();
    this.isFeaturesAccordionOpen = !this.isFeaturesAccordionOpen;
  }

  toggleSolutionsAccordion(event: Event) {
    event.preventDefault();
    this.isSolutionsAccordionOpen = !this.isSolutionsAccordionOpen;
  }
}
