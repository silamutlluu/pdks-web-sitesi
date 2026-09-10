import { Component, OnInit, Signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FeaturesService } from '../../core/services/features.service';
import { IFeatureCategory, IFeatureItem } from '../../core/models/feature.model';
import { FeatureDetailModalComponent } from './components/feature-detail-modal/feature-detail-modal.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FeatureDetailModalComponent, RouterModule],
  templateUrl: './features-page.component.html',
  styleUrl: './features-page.component.scss'
})
export class FeaturesPageComponent implements OnInit {
  private featuresService = inject(FeaturesService);
  private route = inject(ActivatedRoute);

  categories: Signal<IFeatureCategory[]> = this.featuresService.categories;
  features: Signal<IFeatureItem[]> = this.featuresService.filteredFeatures;
  
  // Grouped Features for UI display
  groupedFeatures = computed(() => {
    const allFiltered = this.features();
    const cats = this.categories();
    
    return cats.map(cat => ({
      category: cat,
      features: allFiltered.filter(f => f.category === cat.slug)
    })).filter(group => group.features.length > 0);
  });

  selectedCategory: string = 'all';
  searchQuery: string = '';

  // Modal State
  selectedFeature: IFeatureItem | null = null;
  isModalOpen: boolean = false;

  // Orbit State
  activeOrbitModule: string = 'Smart PDKS';
  orbitDesc: string = 'Merkezi Yönetim Sistemi';
  isOrbitPaused: boolean = false;

  orbitModules = [
    // Ring 1 (6 items)
    { name: 'Cihaz Entegrasyonları', desc: 'Sınırsız Donanım Bağlantısı', icon: 'cpu', ring: 1 },
    { name: 'Anlık Giriş-Çıkış', desc: 'Gerçek Zamanlı Takip', icon: 'activity', ring: 1 },
    { name: 'Yönetim Panelleri', desc: 'Analitik Dashboard', icon: 'layout-dashboard', ring: 1 },
    { name: 'Tüm Özellikler', desc: 'Genişletilmiş Modüller', icon: 'grid', ring: 1 },
    { name: 'Genel Bakış', desc: 'Sistem Özeti', icon: 'eye', ring: 1 },
    { name: 'Bildirim Yönetimi', desc: 'Anlık SMS & E-Posta', icon: 'bell', ring: 1 },
    // Ring 2 (8 items)
    { name: 'QR Kodlu Geçiş', desc: 'Mobil Temassız Geçiş', icon: 'qr-code', ring: 2 },
    { name: 'Kartlı Geçiş', desc: 'RFID ve Mifare Desteği', icon: 'credit-card', ring: 2 },
    { name: 'Biyometrik Doğrulama', desc: 'Yüz Tanıma & Parmak İzi', icon: 'fingerprint', ring: 2 },
    { name: 'Konum Bazlı Kayıt', desc: 'GPS ve Geofencing', icon: 'map-pin', ring: 2 },
    { name: 'Vardiya Yönetimi', desc: 'Karmaşık Vardiya Planlama', icon: 'calendar-clock', ring: 2 },
    { name: 'Fazla Mesai Hesaplama', desc: 'Otomatik Mesai Algoritmaları', icon: 'clock', ring: 2 },
    { name: 'Puantaj İşlemleri', desc: 'Hatasız Bordro Hazırlığı', icon: 'file-spreadsheet', ring: 2 },
    { name: 'İzin Yönetimi', desc: 'Çok Kademeli Onay Akışı', icon: 'calendar-days', ring: 2 },
    // Ring 3 (8 items)
    { name: 'Personel Kartları', desc: 'Kapsamlı Özlük Dosyası', icon: 'contact', ring: 3 },
    { name: 'Yemekhane Yönetimi', desc: 'Öğün ve Hak Takibi', icon: 'utensils', ring: 3 },
    { name: 'Zimmet Yönetimi', desc: 'Donanım ve Ekipman Takibi', icon: 'box', ring: 3 },
    { name: 'Ziyaretçi Yönetimi', desc: 'Misafir ve Kurye Takibi', icon: 'users', ring: 3 },
    { name: 'Puantaj Raporları', desc: 'Detaylı İK Çıktıları', icon: 'pie-chart', ring: 3 },
    { name: 'Anket İşlemleri', desc: 'Personel Geri Bildirimleri', icon: 'clipboard-check', ring: 3 },
    { name: 'Çoklu Lokasyon', desc: 'Şube Bazlı Yönetim', icon: 'building-2', ring: 3 },
    { name: 'Kullanıcı ve Rol Yönetimi', desc: 'Detaylı Yetkilendirme', icon: 'shield-check', ring: 3 }
  ];

  getRingItems(ring: number) {
    return this.orbitModules.filter(m => m.ring === ring);
  }

  getDuration(ring: number) {
    if (ring === 1) return 30;
    if (ring === 2) return 45;
    return 60;
  }

  getDelay(ring: number, indexGlobal: number) {
    const itemsInRing = this.getRingItems(ring);
    const mod = this.orbitModules[indexGlobal];
    const indexInRing = itemsInRing.indexOf(mod);
    const duration = this.getDuration(ring);
    return -(duration / itemsInRing.length) * indexInRing;
  }

  setOrbitModule(name: string, desc: string) {
    this.activeOrbitModule = name;
    this.orbitDesc = desc;
    this.isOrbitPaused = true;
  }

  resetOrbit() {
    this.activeOrbitModule = 'Smart PDKS';
    this.orbitDesc = 'Merkezi Yönetim Sistemi';
    this.isOrbitPaused = false;
  }

  openOrbitFeature(moduleName: string) {
    const slugMap: Record<string, string> = {
      'Cihaz Entegrasyonları': 'cihaz-entegrasyonlari',
      'Anlık Giriş-Çıkış': 'anlik-giris-cikis-takibi',
      'Vardiya Yönetimi': 'vardiya-yonetimi',
      'Fazla Mesai Hesaplama': 'fazla-mesai-hesaplama',
      'Puantaj İşlemleri': 'puantaj-islemleri',
      'İzin Yönetimi': 'izin-yonetimi',
      'Personel Kartları': 'personel-kartlari',
      'Yemekhane Yönetimi': 'yemekhane-yonetimi',
      'Zimmet Yönetimi': 'zimmet-yonetimi',
      'Ziyaretçi Yönetimi': 'ziyaretci-yonetimi',
      'Puantaj Raporları': 'puantaj-raporlari',
      'Yönetim Panelleri': 'yonetim-panelleri',
      'Anket İşlemleri': 'anket-islemleri',
      'Çoklu Lokasyon': 'coklu-lokasyon',
      'Kullanıcı ve Rol Yönetimi': 'kullanici-ve-rol-yonetimi',
      'Konum Bazlı Kayıt': 'konum-bazli-kayit',
      'QR Kodlu Geçiş': 'qr-kodlu-gecis',
      'Kartlı Geçiş': 'kartli-gecis',
      'Biyometrik Doğrulama': 'biyometrik-dogrulama',
      'Bildirim Yönetimi': 'bildirim-yonetimi',
      'Tüm Özellikler': 'genel-bakis-ve-diger',
      'Genel Bakış': 'genel-bakis-ve-diger'
    };

    const targetSlug = slugMap[moduleName];
    
    if (targetSlug) {
      const feature = this.featuresService.getFeatureBySlug(targetSlug);
      if (feature) {
        this.openFeature(feature);
        return;
      }
    }
    
    // If not found or it's "Tüm Özellikler" / "Genel Bakış", scroll down
    document.querySelector('.controls-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    this.selectedCategory = this.featuresService.getSelectedCategory();
    
    // Check fragment on load
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.openFeatureBySlug(fragment);
      }
    });
  }

  onCategorySelect(categoryId: string) {
    this.selectedCategory = categoryId;
    this.featuresService.setSelectedCategory(categoryId);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.featuresService.setSearchQuery(this.searchQuery);
  }

  openFeature(feature: IFeatureItem) {
    this.selectedFeature = feature;
    this.isModalOpen = true;
    
    // Update URL fragment without reloading page
    history.replaceState(null, '', `/features#${feature.slug}`);
  }

  openFeatureBySlug(slug: string) {
    const feature = this.featuresService.getFeatureBySlug(slug);
    if (feature) {
      if (this.selectedCategory !== 'all' && this.selectedCategory !== feature.category) {
        this.onCategorySelect('all');
      }
      this.openFeature(feature);

      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }

  closeModal() {
    this.isModalOpen = false;
    // Remove fragment on close
    history.replaceState(null, '', '/features');
    
    setTimeout(() => {
      this.selectedFeature = null;
    }, 300);
  }
}
