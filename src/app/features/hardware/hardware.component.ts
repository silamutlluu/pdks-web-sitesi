import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-hardware',
  standalone: true,
  imports: [LucideAngularModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './hardware.component.html',
  styleUrl: './hardware.component.scss'
})
export class HardwareComponent {
  activeFaqIndex: number | null = null;
  searchQuery: string = '';

  faqs: FAQ[] = [
    {
      question: 'Donanım arızası veya internet kesintisinde ne olur?',
      answer: 'Cihazlarımız <strong>offline veri depolama</strong> kapasitesine sahiptir (100.000 kayda kadar). İnternet bağlantısı yeniden sağlandığında tüm loglar sisteme eksiksiz senkronize edilir.'
    },
    {
      question: 'Mevcut eski cihazlarımızı kullanabilir miyiz?',
      answer: 'SDK ve API desteği bulunan birçok cihaz ile haberleşebiliyoruz. Cihazlarınızın uyumluluk durumunu ücretsiz analiz ediyoruz.'
    },
    {
      question: 'Hangi markalarla uyumlusunuz?',
      answer: 'ZKTeco, Hikvision, Suprema, Dahua gibi sektörün önde gelen tüm global markalarıyla native (doğrudan) iletişim kurabilmekteyiz.'
    },
    {
      question: 'Turnike montajını siz mi yapıyorsunuz?',
      answer: 'Biz bir yazılım şirketiyiz ancak Türkiye geneline yayılmış yetkili entegratör iş ortaklarımız aracılığıyla anahtar teslim (donanım + yazılım + montaj) projeler sunabiliyoruz.'
    }
  ];

  get filteredFaqs(): FAQ[] {
    if (!this.searchQuery.trim()) return this.faqs;
    const query = this.searchQuery.toLowerCase();
    return this.faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  }

  toggleFaq(index: number) {
    if (this.activeFaqIndex === index) {
      this.activeFaqIndex = null;
    } else {
      this.activeFaqIndex = index;
    }
  }
}
