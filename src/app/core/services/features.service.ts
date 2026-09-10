import { Injectable, computed, signal } from '@angular/core';
import { IFeatureCategory, IFeatureItem } from '../models/feature.model';
import { FEATURE_CATEGORIES, FEATURES_DATA } from '../data/features.data';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  // State
  private _features = signal<IFeatureItem[]>([]);
  private _categories = signal<IFeatureCategory[]>([]);
  private _searchQuery = signal<string>('');
  private _selectedCategory = signal<string>('all');
  
  // Computed Signals for UI
  readonly categories = computed(() => this._categories());
  
  readonly filteredFeatures = computed(() => {
    let result = this._features();
    const query = this._searchQuery().toLowerCase().trim();
    const cat = this._selectedCategory();

    if (cat !== 'all') {
      result = result.filter(f => f.category === cat);
    }
    if (query) {
      result = result.filter(f => 
        f.title.toLowerCase().includes(query) || 
        f.shortDescription.toLowerCase().includes(query) ||
        f.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    return result;
  });

  constructor() {
    // Initialize mock data
    this._categories.set(FEATURE_CATEGORIES);
    this._features.set(FEATURES_DATA);
  }

  setSearchQuery(query: string) {
    this._searchQuery.set(query);
  }

  setSelectedCategory(categoryId: string) {
    this._selectedCategory.set(categoryId);
  }
  
  getSelectedCategory() {
    return this._selectedCategory();
  }

  getFeatureBySlug(slug: string): IFeatureItem | undefined {
    return this._features().find(f => f.slug === slug);
  }

  // Simulate API call for fetching initial state if needed later
  loadDataAsync(): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}
