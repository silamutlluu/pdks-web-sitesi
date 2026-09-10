import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

interface ModuleTab {
  id: string;
  title: string;
  desc: string;
  icon: string;
  link: string;
  linkText: string;
  imageUrl: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface LiveFeedEvent {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  activeTabId = 'mobil';
  activeFaqIndex: number | null = null;
  searchQuery: string = '';

  // Solution Quiz State
  quizEmployees: '1-50' | '51-250' | '250+' = '51-250';
  quizEnvironment: 'factory' | 'site' | 'office' = 'factory';
  quizMethod: 'face' | 'mobile' | 'turnstile' = 'face';

  get quizResult() {
    let packageName = 'Profesyonel';
    let packagePrice = '3.600';
    let packageBadge = 'En Çok Tercih Edilen';
    let employeeCount = '51 - 250 Çalışan';
    let features: string[] = [
      'Gelişmiş Vardiya & Rotasyon Yönetimi',
      'Donanım Entegrasyonu (API)',
      'AI Destekli Anomali Tespiti',
      'Öncelikli Telefon Desteği'
    ];

    if (this.quizEmployees === '1-50') {
      packageName = 'Başlangıç';
      packagePrice = '1.499';
      packageBadge = 'Küçük İşletmeler İçin';
      employeeCount = '1 - 50 Çalışan';
      features = [
        'Temel Puantaj Yönetimi',
        'İzin & Devamsızlık Takibi',
        'Standart Raporlama Motoru',
        'E-posta Destek Hizmeti'
      ];
    } else if (this.quizEmployees === '250+') {
      packageName = 'İleri Seviye';
      packagePrice = '6.800';
      packageBadge = 'Büyük Ölçekli Kurumlar';
      employeeCount = '251 - 500+ Çalışan';
      features = [
        'Çoklu Lokasyon Merkezi Yönetim',
        'Personel Maliyet Analizleri',
        'Tüm ERP / İK Sistemleriyle Entegrasyon',
        'VIP Müşteri Temsilcisi'
      ];
    }

    let hardwareName = 'Megvii M3 AI Yüz Tanıma Terminali';
    let hardwareIcon = 'scan-face';
    let hardwareDetail = 'Yüksek hızlı 0.2 sn biyometrik yüz okuma ve geçiş kontrolü.';

    if (this.quizMethod === 'mobile') {
      hardwareName = 'Mobil QR & GPS Konum Doğrulama';
      hardwareIcon = 'smartphone';
      hardwareDetail = 'Fiziki cihaza gerek olmadan mobil iOS/Android konumlu ve QR kodlu giriş.';
    } else if (this.quizMethod === 'turnstile') {
      hardwareName = 'Biyometrik Kartlı Turnike Terminali';
      hardwareIcon = 'shield-check';
      hardwareDetail = 'Kart ve parmak izi okuyuculu entegre turnike kontrol paneli.';
    }

    let envNote = 'Vardiyalı üretim tesisleri için %100 uyumlu rotasyon altyapısı.';
    if (this.quizEnvironment === 'site') {
      envNote = 'Saha ve şantiyeler için GPS konum doğrulamalı esnek çalışma düzeni.';
    } else if (this.quizEnvironment === 'office') {
      envNote = 'Kurumsal ofis ve şubeler için hızlı geçiş ve şeffaf takip altyapısı.';
    }

    return {
      packageName,
      packagePrice,
      packageBadge,
      employeeCount,
      features,
      hardwareName,
      hardwareIcon,
      hardwareDetail,
      envNote
    };
  }
  
  private autoPlayInterval: any;
  private feedInterval: any;
  private eventIdCounter = 0;

  liveFeed: LiveFeedEvent[] = [];
  
  // Typing Effect State
  typingWords = ['Zamanı', 'İzinleri', 'Vardiyaları', 'Puantajı', 'Maaşları'];
  currentTypingWord = '';
  private typingIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: any;

  private mockEventsPool = [
    { user: 'Ahmet Yılmaz', action: 'Saha Girişi Doğrulandı (GPS)', type: 'success' as const, icon: 'map-pin' },
    { user: 'Ayşe Demir', action: 'Turnike Geçiş (Yüz Tanıma)', type: 'success' as const, icon: 'scan-face' },
    { user: 'Sistem Uyarı', action: 'Vardiya Uyuşmazlığı Tespit Edildi', type: 'warning' as const, icon: 'alert-circle' },
    { user: 'Mehmet Can', action: 'İzin Talebi Onaylandı', type: 'info' as const, icon: 'calendar-days' },
    { user: 'Zeynep Kaya', action: 'Fazla Mesai Başlangıcı', type: 'info' as const, icon: 'clock' },
    { user: 'ERP Entegrasyonu', action: '230 Bordro Kaydı Başarıyla Aktarıldı', type: 'success' as const, icon: 'database' },
    { user: 'Caner Şahin', action: 'QR ile Geçiş Doğrulandı', type: 'success' as const, icon: 'qr-code' }
  ];

  faqs: FAQ[] = [
    {
      question: 'Sistemin KVKK uyumu nedir?',
      answer: 'Sistem, yüz tanıma ve parmak izi gibi biyometrik verileri şifreli olarak saklar, üçüncü taraflarla paylaşmaz ve KVKK\'nın öngördüğü açık rıza ile veri işleme ilkelerine tam uyum sağlar.'
    },
    {
      question: 'İnternet veya elektrik kesintisinde ne olur?',
      answer: 'Cihazlarımız elektrik kesintilerinde çalışmaya devam eder. İnternet yokken logları kendi hafızasında tutar ve bağlantı geldiğinde otomatik olarak buluta senkronize eder.'
    },
    {
      question: 'Çoklu şube ve lokasyon desteği var mı?',
      answer: 'Evet, satın alınan pakete göre belirlenen sayıda şube ve lokasyonu tek bir merkezi panel üzerinden anlık olarak takip edip yönetebilirsiniz.'
    },
    {
      question: 'Mevcut İK veya ERP (SAP, Logo vb.) yazılımlarına entegre edilebilir mi?',
      answer: 'Kesinlikle. Gelişmiş API altyapımız sayesinde piyasadaki çoğu öncü IK ve ERP sistemiyle entegre olabiliyor, dilerseniz kendi iç yazılımlarınıza doğrudan veri aktarabiliyoruz.'
    },
    {
      question: 'Kurulum süreci ne kadar sürer ve teknik destek sağlanıyor mu?',
      answer: 'Donanım kurulumları fiziki koşullara göre değişiklik gösterse de yazılım kısmı anında aktifleştirilir (Bulut/SaaS model).'
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

  tabs: ModuleTab[] = [
    {
      id: 'mobil',
      title: 'Mobil Uygulama',
      desc: 'Personeliniz kendi cep telefonlarından GPS konumuyla veya QR kod okutarak giriş-çıkış yapabilir. Saha ekiplerini anlık takip edin.',
      icon: 'smartphone',
      link: '/features',
      linkText: 'Detaylı İncele',
      imageUrl: 'assets/logos/Telefon1.png'
    },
    {
      id: 'biyometrik',
      title: 'Biyometrik Entegrasyon',
      desc: 'Parmak izi, yüz tanıma veya kart okuyuculu tüm marka cihazlarla %100 uyumlu ve anlık haberleşme altyapısı.',
      icon: 'fingerprint',
      link: '/hardware',
      linkText: 'Detaylı İncele',
      imageUrl: 'assets/logos/Megvii-M3.png'
    },
    {
      id: 'vardiya',
      title: 'Vardiya Yönetimi',
      desc: 'En karmaşık vardiyaları planlayan haberleşme altyapısı. Resmi tatiller, fazla mesailer otomatik hesaplansın.',
      icon: 'calendar-clock',
      link: '/features',
      linkText: 'Detaylı İncele',
      imageUrl: 'assets/logos/Dashboard (2).png'
    }
  ];

  sliderPosition: number = 50;

  updateSlider(event: Event) {
    const input = event.target as HTMLInputElement;
    this.sliderPosition = parseInt(input.value, 10);
  }

  ngOnInit() {
    this.startAutoPlay();
    this.startLiveFeed();
    this.startTypingEffect();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    this.stopLiveFeed();
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  // --- Typing Effect Logic ---
  startTypingEffect() {
    if (typeof window === 'undefined') return;
    const type = () => {
      const currentWord = this.typingWords[this.typingIndex];
      
      if (this.isDeleting) {
        this.currentTypingWord = currentWord.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.currentTypingWord = currentWord.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      let typeSpeed = this.isDeleting ? 50 : 100;

      if (!this.isDeleting && this.charIndex === currentWord.length) {
        typeSpeed = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.typingIndex = (this.typingIndex + 1) % this.typingWords.length;
        typeSpeed = 500;
      }

      this.typingTimer = setTimeout(type, typeSpeed);
    };
    type();
  }

  startAutoPlay() {
    if (typeof window === 'undefined') return;
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      const currentIndex = this.tabs.findIndex(t => t.id === this.activeTabId);
      const nextIndex = (currentIndex + 1) % this.tabs.length;
      this.activeTabId = this.tabs[nextIndex].id;
    }, 3000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  onTabHover(isHovering: boolean) {
    if (isHovering) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  setActiveTab(id: string, manual = false) {
    this.activeTabId = id;
    if (manual) {
      this.startAutoPlay();
    }
    if (typeof window !== 'undefined') {
      window.location.hash = 'module-' + id;
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --- Live Feed Mock Logic ---
  startLiveFeed() {
    if (typeof window === 'undefined') return;
    
    // Initial 2 events
    this.pushRandomEvent();
    setTimeout(() => this.pushRandomEvent(), 800);

    // Push new event randomly between 2-4 seconds
    const scheduleNext = () => {
      this.feedInterval = setTimeout(() => {
        this.pushRandomEvent();
        scheduleNext();
      }, Math.random() * 2000 + 2000);
    };
    scheduleNext();
  }

  stopLiveFeed() {
    if (this.feedInterval) {
      clearTimeout(this.feedInterval);
    }
  }

  pushRandomEvent() {
    const randomTemplate = this.mockEventsPool[Math.floor(Math.random() * this.mockEventsPool.length)];
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newEvent: LiveFeedEvent = {
      id: ++this.eventIdCounter,
      user: randomTemplate.user,
      action: randomTemplate.action,
      type: randomTemplate.type,
      icon: randomTemplate.icon,
      time: timeStr
    };

    this.liveFeed.unshift(newEvent);
    if (this.liveFeed.length > 4) {
      this.liveFeed.pop();
    }
  }
}
