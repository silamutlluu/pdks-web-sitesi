import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

export interface SectorMenu {
  title: string;
  description: string;
  iconKey: string;
  badgeColor: string;
  linkUrl: string;
}

export const SECTORS_DATA: SectorMenu[] = [
  {
    title: 'Üretim & Fabrika',
    description: '3 vardiyalı karmaşık rotasyonlar ve puantaj yönetimi.',
    iconKey: 'factory',
    badgeColor: '#3b82f6',
    linkUrl: 'uretim-ve-fabrika'
  },
  {
    title: 'Perakende & Mağazacılık',
    description: 'Çoklu lokasyon yönetimi ve esnek mesai planlama.',
    iconKey: 'store',
    badgeColor: '#10b981',
    linkUrl: 'perakende-ve-magazacilik'
  },
  {
    title: 'Kurumsal Ofisler',
    description: 'Esnek mesai, hibrit çalışma ve kapsamlı izin takibi.',
    iconKey: 'briefcase',
    badgeColor: '#f59e0b',
    linkUrl: 'kurumsal-ofisler'
  },
  {
    title: 'İnşaat & Şantiye',
    description: 'GPS konumuyla doğrulama ve taşeron takip otomasyonu.',
    iconKey: 'hard-hat',
    badgeColor: '#6366f1',
    linkUrl: 'insaat-ve-santiye'
  },
  {
    title: 'Sağlık & Turizm',
    description: '7/24 kesintisiz nöbet değişimi ve operasyon devamlılığı.',
    iconKey: 'heart-pulse',
    badgeColor: '#ec4899',
    linkUrl: 'saglik-ve-turizm'
  },
  {
    title: 'Eğitim & Okul',
    description: 'Akademik ve idari personel mesai takibi, esnek derslik planlaması.',
    iconKey: 'graduation-cap',
    badgeColor: '#8b5cf6',
    linkUrl: 'egitim-ve-okul'
  }
];

@Component({
  selector: 'app-solutions-mega-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './solutions-mega-menu.component.html',
  styleUrl: './solutions-mega-menu.component.scss'
})
export class SolutionsMegaMenuComponent {
  
  sectors = SECTORS_DATA;

  getColor(colorCode: string): string {
    return colorCode || '#3b82f6';
  }
}
