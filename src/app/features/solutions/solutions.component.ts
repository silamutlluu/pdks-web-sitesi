import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';

export interface SectorOption {
  id: string;
  name: string;
  icon: string;
  highlightBadge: string;
  statLabel: string;
  statValue: string;
  note: string;
}

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  selectedSectorId: string = 'fabrika';

  sectors: SectorOption[] = [
    {
      id: 'fabrika',
      name: 'Üretim & Fabrika',
      icon: 'factory',
      highlightBadge: 'Vardiya & Fazla Mesai Otomasyonu',
      statLabel: 'Hata Oranı Düşüşü',
      statValue: '%98 Önleme',
      note: '3 Vardiyalı üretim hatlarında manuel işlem yükü ve vardiya çakışmaları sıfırlanıyor.'
    },
    {
      id: 'santiye',
      name: 'İnşaat & Şantiye',
      icon: 'hard-hat',
      highlightBadge: 'Taşeron & Saha Giriş Denetimi',
      statLabel: 'GPS Konum Doğruluğu',
      statValue: '%99.9 Uyum',
      note: 'Saha ve şantiyelerde sahte check-in ve yetkisiz taşeron girişleri engelleniyor.'
    },
    {
      id: 'magaza',
      name: 'Perakende & Mağaza',
      icon: 'store',
      highlightBadge: 'Şubeler Arası Esnek Vardiya Yönetimi',
      statLabel: 'Şube Denetim Hızı',
      statValue: '5 Kat Hızlı',
      note: 'Yüzlerce şubedeki part-time ve esnek mesai süreçleri anında koordine ediliyor.'
    },
    {
      id: 'ofis',
      name: 'Kurumsal Ofis',
      icon: 'briefcase',
      highlightBadge: 'Puantaj & İzin Evrak Otomasyonu',
      statLabel: 'Bordro Hazırlık Süresi',
      statValue: '2 Dakika',
      note: 'Ay sonu manuel puantaj ve izin kağıdı hesaplama çilesi tamamen bitiyor.'
    },
    {
      id: 'saglik',
      name: 'Sağlık & Turizm',
      icon: 'heart-pulse',
      highlightBadge: '7/24 Nöbet & Vardiya Güvencesi',
      statLabel: 'Nöbet Takip Doğruluğu',
      statValue: '%100 Kesintisiz',
      note: '7/24 kesintisiz tesislerde nöbet değişimleri ve fazla mesai hak edişleri hatasız hesaplanıyor.'
    },
    {
      id: 'egitim',
      name: 'Eğitim & Okul',
      icon: 'graduation-cap',
      highlightBadge: 'Nöbetçi & Akademik Kadro Takibi',
      statLabel: 'Derslik Uyum Oranı',
      statValue: '%99.5 Başarı',
      note: 'Akademik ve idari personelin ders saatleri ve nöbet takipleri dijitalleşiyor.'
    }
  ];

  get currentSector(): SectorOption {
    return this.sectors.find(s => s.id === this.selectedSectorId) || this.sectors[0];
  }

  selectSector(id: string) {
    this.selectedSectorId = id;
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const sectorMap: Record<string, string> = {
          'uretim-ve-fabrika': 'fabrika',
          'perakende-ve-magazacilik': 'magaza',
          'kurumsal-ofisler': 'ofis',
          'insaat-ve-santiye': 'santiye',
          'saglik-ve-turizm': 'saglik',
          'egitim-ve-okul': 'egitim'
        };
        const sectorId = sectorMap[fragment] || fragment;
        if (this.sectors.some(s => s.id === sectorId)) {
          this.selectSector(sectorId);
        }

        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    });
  }
}
