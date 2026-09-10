import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FEATURE_CATEGORIES, FEATURES_DATA } from '../../core/data/features.data';

export interface FeatureDto {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  linkUrl: string;
}

export interface FeatureCategoryDto {
  id: string;
  name: string;
  slug: string;
  badgeColor: string;
  displayOrder: number;
  features: FeatureDto[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export function getBadgeColorHex(color: string): string {
  const map: Record<string, string> = {
    blue: '#3b82f6',
    emerald: '#10b981',
    violet: '#8b5cf6',
    amber: '#f59e0b',
    slate: '#64748b',
    gray: '#6b7280'
  };
  return map[color] || '#94a3b8';
}

@Component({
  selector: 'app-features-mega-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './features-mega-menu.component.html',
  styleUrl: './features-mega-menu.component.scss'
})
export class FeaturesMegaMenuComponent implements OnInit {
  private http = inject(HttpClient);

  categories: FeatureCategoryDto[] = [];
  genelCategory: FeatureCategoryDto | null = null;
  sistemCategory: FeatureCategoryDto | null = null;
  
  isLoading = true;
  hasError = false;

  getColor = getBadgeColorHex;

  getFragment(url: string): string {
    if (!url) return '';
    if (url.includes('#')) {
      return url.split('#').pop() || '';
    }
    return url.split('/').pop() || '';
  }

  ngOnInit() {
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
      catchError(err => {
        console.warn('Mega menu categories fetch error, using fallback data', err);
        this.hasError = false;
        this.isLoading = false;
        return of({ success: true, data: fallbackData });
      })
    ).subscribe(res => {
      const data = res.data;
      if (data && data.length > 0) {
        this.categories = data.filter(c => c.slug !== 'genel' && !c.slug.includes('sistem'));
        this.genelCategory = data.find(c => c.slug === 'genel') || null;
        this.sistemCategory = data.find(c => c.slug.includes('sistem')) || null;
      }
      this.isLoading = false;
    });
  }
}
