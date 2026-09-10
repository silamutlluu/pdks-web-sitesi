import { IFeatureCategory, IFeatureItem } from '../models/feature.model';

export const FEATURE_CATEGORIES: IFeatureCategory[] = [
  { id: 'giris-cikis-yontemleri', name: 'Giriş-Çıkış Yöntemleri', slug: 'giris-cikis-yontemleri', icon: 'fingerprint', colorHex: '#3b82f6' },
  { id: 'puantaj-takip', name: 'Puantaj Takip', slug: 'puantaj-takip', icon: 'clock', colorHex: '#10b981' },
  { id: 'personel-yonetimi', name: 'Personel Yönetimi', slug: 'personel-yonetimi', icon: 'users', colorHex: '#8b5cf6' },
  { id: 'raporlar-ve-analiz', name: 'Raporlar ve Analiz', slug: 'raporlar-ve-analiz', icon: 'pie-chart', colorHex: '#f59e0b' },
  { id: 'sistem-ve-ayarlar', name: 'Sistem ve Ayarlar', slug: 'sistem-ve-ayarlar', icon: 'settings', colorHex: '#64748b' },
  { id: 'genel', name: 'Genel', slug: 'genel', icon: 'layers', colorHex: '#ec4899' }
];

export const FEATURES_DATA: IFeatureItem[] = [
  // 1. GİRİŞ-ÇIKIŞ YÖNTEMLERİ
  {
    id: 'qr-kodlu-gecis',
    slug: 'qr-kodlu-gecis',
    title: 'QR Kodlu Geçiş',
    category: 'giris-cikis-yontemleri',
    shortDescription: 'Temassız, hızlı ve akıllı telefon tabanlı dinamik geçiş kontrol sistemi.',
    fullDescription: 'Fiziksel kart maliyetlerini ortadan kaldıran QR Kodlu Geçiş modülü, personelin mobil cihazları üzerinden saniyeler içinde güvenli doğrulama yapmasını sağlar. Dinamik olarak üretilen şifreli karekodlar sayesinde yetkisiz geçiş riskleri tamamen önlenir.',
    icon: 'smartphone',
    bulletPoints: [
      'Zamana duyarlı (Time-based) ve tek kullanımlık dinamik QR kod üretimi.',
      'Fiziksel kart basım, dağıtım ve yenileme maliyetlerinin sıfırlanması.',
      'Mevcut turnike ve kapı kontrol sistemleriyle donanımsal röle entegrasyonu.',
      'Çevrimdışı (offline) loglama ve bağlantı kurulduğunda anında senkronizasyon.'
    ],
    tags: ['Temassız', 'Mobil', 'Güvenli'],
    fallbackSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`
  },
  {
    id: 'kartli-gecis',
    slug: 'kartli-gecis',
    title: 'Kartlı Geçiş',
    category: 'giris-cikis-yontemleri',
    shortDescription: 'Mifare, Proximity ve HID altyapılarıyla tam entegre, güvenilir erişim.',
    fullDescription: 'Kurumların mevcut donanım yatırımlarını koruyan Kartlı Geçiş modülü, personelin yaka kartları üzerinden geçiş yetkilerinin merkezi olarak yönetilmesine olanak tanır. Departman veya kat bazlı erişim kısıtlamaları yapılabilir.',
    icon: 'credit-card',
    bulletPoints: [
      'Mifare, Proximity, HID ve DESFire teknolojileriyle tam uyumluluk.',
      'Anti-passback (çift giriş/çıkış engelleme) kurallarının donanım seviyesinde uygulanması.',
      'Kayıp/çalıntı kartların tek tıkla kara listeye alınması.',
      'TCP/IP ve RS-485 üzerinden gerçek zamanlı log aktarımı.'
    ],
    tags: ['RFID', 'Donanım', 'Erişim Kontrolü'],
    fallbackSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`
  },
  {
    id: 'biyometrik-dogrulama',
    slug: 'biyometrik-dogrulama',
    title: 'Biyometrik Doğrulama',
    category: 'giris-cikis-yontemleri',
    shortDescription: 'Yüz tanıma ve parmak izi teknolojileriyle %100 doğrulanmış geçiş.',
    fullDescription: 'Personelin fiziksel özelliklerini şifrelenmiş verilere dönüştürerek kimlik doğrulaması yapan modül, başkasının yerine kart okutma (buddy punching) sorununu kesin olarak çözer.',
    icon: 'scan-face',
    bulletPoints: [
      'Liveness detection ile fotoğraf veya video ile geçiş denemelerinin engellenmesi.',
      'Verilerin cihaz üzerinde geri döndürülemez hash fonksiyonuyla maskelenmesi (KVKK uyumlu).',
      'Cihazlar arası otomatik biyometrik şablon senkronizasyonu.',
      'Karanlık ortamlarda çalışabilen kızılötesi destekli yüz tanıma.'
    ],
    tags: ['Yüz Tanıma', 'Parmak İzi', 'Yüksek Güvenlik'],
  },
  {
    id: 'konum-bazli-kayit',
    slug: 'konum-bazli-kayit',
    title: 'Konum Bazlı Kayıt',
    category: 'giris-cikis-yontemleri',
    shortDescription: 'Saha ekipleri için GPS tabanlı, coğrafi çit (Geofence) destekli check-in.',
    fullDescription: 'Mobil cihazların GPS sensörlerini kullanan modül, saha ekiplerinin veya uzaktan çalışan personelin belirlenen koordinatlar içerisinde giriş-çıkış işlemi yapmasını zorunlu kılar.',
    icon: 'map-pin',
    bulletPoints: [
      'Harita üzerinden Geofence çizme ve sapma toleransı (örn. 50 metre) belirleme.',
      'Sahte GPS (Fake Location) uygulamalarının tespiti ve hileli girişlerin engellenmesi.',
      'GPS koordinatlarını cihaz hafızasında tutup bağlantı gelince sonradan iletme.',
      'Google Maps / Yandex altyapıları ile geçmiş rota loglama.'
    ],
    tags: ['GPS', 'Saha Ekipleri', 'Mobil'],
  },

  // 2. PUANTAJ TAKİP
  {
    id: 'anlik-giris-cikis-takibi',
    slug: 'anlik-giris-cikis-takibi',
    title: 'Anlık Giriş-Çıkış Takibi',
    category: 'puantaj-takip',
    shortDescription: 'Tüm lokasyonlardaki hareket verilerinin gerçek zamanlı izlenmesi.',
    fullDescription: 'Donanımlardan ve mobil cihazlardan alınan tüm hareket logları, WebSocket teknolojisi ile anlık olarak yönetim paneline düşer. İK departmanı canlı bir dashboard üzerinden devamsızlıkları izler.',
    icon: 'activity',
    bulletPoints: [
      'Geç kalan veya gelmeyen personellerin anlık olarak uyarı paneline düşmesi.',
      'Çift yönlü haberleşme (Push) mimarisi ile sayfa yenilemeden canlı akış.',
      'Farklı şube ve lokasyonlardaki verilerin tek bir ekranda konsolide edilmesi.',
      'Logların değiştirilemez formatta yasal denetim için saklanması.'
    ],
    tags: ['Gerçek Zamanlı', 'Canlı İzleme'],
  },
  {
    id: 'vardiya-yonetimi',
    slug: 'vardiya-yonetimi',
    title: 'Vardiya Yönetimi',
    category: 'puantaj-takip',
    shortDescription: 'En karmaşık mesai planlamalarını otomatize eden akıllı motor.',
    fullDescription: 'Üretim tesisleri ve sağlık sektörü gibi 7/24 esasına dayalı çalışan kurumların 3 vardiyalı veya esnek mesai planlarını tek bir ekrandan, sürükle-bırak yöntemiyle yönetmesini sağlar.',
    icon: 'calendar-clock',
    bulletPoints: [
      'Serbest, Sabit ve Otomatik Rotasyonlu Vardiya gruplarının esnek tanımı.',
      'Personelin geliş saatine göre vardiyayı dinamik tahmin eden algoritma.',
      'Vardiya değişim ve mazeret taleplerinin mobil uygulama üzerinden yapılması.',
      'Çoklu dinlenme ve yemek molası sürelerinin konfigüre edilebilmesi.'
    ],
    tags: ['Planlama', 'Esnek Mesai'],
  },
  {
    id: 'fazla-mesai-hesaplama',
    slug: 'fazla-mesai-hesaplama',
    title: 'Fazla Mesai Hesaplama',
    category: 'puantaj-takip',
    shortDescription: 'Dinamik kurallara bağlı, onaya tabi hatasız fazla mesai modülü.',
    fullDescription: 'Personelin olağan çalışma saatlerinin üzerindeki hareketlerini analiz eder ve işletmenin belirlediği parametrelere göre otomatik olarak fazla mesai ücretlendirmesine dönüştürür.',
    icon: 'timer',
    bulletPoints: [
      'Erken gelme ve geç çıkma sürelerinin tolerans limitlerine göre filtrelenmesi.',
      'Serbest ve Talep/Onaylı Fazla Mesai olmak üzere çift modlu çalışma prensibi.',
      'Hafta içi, hafta sonu, genel tatil çarpan katsayılarının özelleştirilmesi.',
      '270 saatlik yıllık yasal fazla mesai sınırı aşımlarında İK bildirimleri.'
    ],
    tags: ['Bordro', 'Yasal Uyum'],
  },
  {
    id: 'puantaj-islemleri',
    slug: 'puantaj-islemleri',
    title: 'Puantaj İşlemleri',
    category: 'puantaj-takip',
    shortDescription: 'Giriş-çıkış loglarının anlamlı bordro verilerine dönüştüğü merkez.',
    fullDescription: 'Ham saatler, izinler ve vardiya parametrelerini birleştirerek personelin net çalışma süresini, eksik günlerini ve hak edişlerini hesaplar. Ay sonu süreçlerini dakikalara indirir.',
    icon: 'clipboard-check',
    bulletPoints: [
      'Çalışma, fazla mesai, eksik gün ve hafta tatili hak edişlerinin tam hesabı.',
      'Eksik veya hatalı hareketleri (anomali) tespit edip renklendiren uyarı sistemi.',
      'Farklı lokasyonlar için departman amirleri tarafından toplu onay akışı.',
      'Logo, SAP, Mikro gibi ERP yazılımlarına txt/xml formatlarında doğrudan ihraç.'
    ],
    tags: ['Hesaplama', 'ERP Entegrasyonu'],
  },

  // 3. PERSONEL YÖNETİMİ
  {
    id: 'personel-kartlari',
    slug: 'personel-kartlari',
    title: 'Personel Kartları',
    category: 'personel-yonetimi',
    shortDescription: 'Çalışanlara ait demografik, özlük ve kurumsal verilerin tek merkezi.',
    fullDescription: 'Personelin işe girişinden itibaren tüm verilerinin 360 derece izlendiği dijital özlük dosyası modülüdür. İşletmenin organizasyon şemasını besler.',
    icon: 'contact',
    bulletPoints: [
      'Departman, yaka tipi ve sözleşme bazlı limitsiz kategorizasyon.',
      'Özlük belgelerinin buluta yüklenmesi ve süresi dolanların uyarı vermesi.',
      'İşten ayrılış (offboarding) süreçlerinde tüm geçiş yetkilerinin otomatik iptali.',
      'KVKK kapsamında Rol Bazlı Erişim Kontrolü (RBAC) ile veri maskeleme.'
    ],
    tags: ['Özlük', 'IK Verisi'],
  },
  {
    id: 'izin-yonetimi',
    slug: 'izin-yonetimi',
    title: 'İzin Yönetimi',
    category: 'personel-yonetimi',
    shortDescription: 'İzin süreçlerinin kağıtsız bir ortamda planlanıp yönetilmesi.',
    fullDescription: 'Çalışanların saniyeler içinde mobil uygulamadan izin talebi oluşturabildiği, taleplerin dinamik onay rotalarına girerek yöneticilere ulaştığı dijital iş akışı çözümüdür.',
    icon: 'calendar-days',
    bulletPoints: [
      'Kıdeme göre yıllık izin hak edişlerinin SGK mevzuatına uygun otomatik tanımı.',
      'Birden fazla onaycı barındıran esnek ve hiyerarşik onay akışları.',
      'Yöneticiler için takvim görünümü (izin çakışmalarını önleme).',
      'Saatlik, yarım günlük mazeret izinlerinin doğrudan puantaja entegrasyonu.'
    ],
    tags: ['Onay Akışı', 'Mobil Uygulama'],
  },
  {
    id: 'yemekhane-yonetimi',
    slug: 'yemekhane-yonetimi',
    title: 'Yemekhane Yönetimi',
    category: 'personel-yonetimi',
    shortDescription: 'Öğün hak edişlerini düzenleyen turnike kontrol mekanizması.',
    fullDescription: 'Personelin vardiya ve çalışma statülerine göre yemek hak edişlerini hesaplar. Yetkisiz veya mükerrer alımları engelleyerek catering mutabakatını kolaylaştırır.',
    icon: 'utensils',
    bulletPoints: [
      'Öğün tanımlamaları (Kahvaltı, Öğle, Gece) ve saat aralıklarının belirlenmesi.',
      'Mükerrer geçişlerin engellenmesiyle yemek maliyetlerinde anında tasarruf.',
      'Ziyaretçi ve taşeronlar için misafir yemek fişi tahsis yetkilendirmesi.',
      'Catering firmasına ödenecek fatura bedelinin hatasız teyit raporları.'
    ],
    tags: ['Maliyet Kontrolü', 'Hak ediş'],
  },
  {
    id: 'zimmet-yonetimi',
    slug: 'zimmet-yonetimi',
    title: 'Zimmet Yönetimi',
    category: 'personel-yonetimi',
    shortDescription: 'Demirbaş ve kurumsal ekipmanların yaşam döngüsü takibi.',
    fullDescription: 'Cihaz (Laptop, Telefon) veya KKD ekipmanlarının personellere dijital ortamda zimmetlendiği modüldür. Offboarding süreçlerinde iadeleri garanti altına alır.',
    icon: 'package',
    bulletPoints: [
      'Zimmet kategorileri bazında limitsiz varlık envanteri havuzu.',
      'Teslim işlemlerinde elektronik veya dijital onay alınması.',
      'Ekipmanların periyodik bakım veya yenileme tarihlerinin takibi.',
      'İşten ayrılışlarda "İade Bekleyen Zimmet" uyarılarıyla sermaye koruması.'
    ],
    tags: ['Envanter', 'Demirbaş'],
  },
  {
    id: 'ziyaretci-yonetimi',
    slug: 'ziyaretci-yonetimi',
    title: 'Ziyaretçi Yönetimi',
    category: 'personel-yonetimi',
    shortDescription: 'Tesisinize gelen misafirlerin kayıt, onay ve güvenli erişim süreçlerinin takibi.',
    fullDescription: 'Kurumunuza gelen misafirlerin, taşeronların veya görüşmecilerin geliş-gidiş süreçlerini dijitalleştiren modüldür. Randevu sistemiyle entegre çalışarak resepsiyon yükünü hafifletir.',
    icon: 'user-check',
    bulletPoints: [
      'Tablet veya kiosk ekranlarından KVKK aydınlatma metni onaylı self-servis kayıt.',
      'Ziyaret edilen personele anında onay için SMS veya Push bildirimi gönderimi.',
      'Misafirlere özel geçici QR Kod ile yalnızca belirli alanlara erişim yetkisi.',
      'Tesis içindeki anlık ziyaretçi sayısını gösteren canlı izleme paneli.'
    ],
    tags: ['Misafir', 'Güvenlik'],
  },

  // 4. RAPORLAR VE ANALİZ
  {
    id: 'puantaj-raporlari',
    slug: 'puantaj-raporlari',
    title: 'Puantaj Raporları',
    category: 'raporlar-ve-analiz',
    shortDescription: 'Tüm işçilik sürelerini süzebilen esnek ve standart raporlama.',
    fullDescription: 'Çok boyutlu filtreleme yetenekleriyle yüzbinlerce ham veriyi saniyeler içinde denetlenebilir tablolara dönüştürür. Çalışma Bakanlığı standartlarına tam uyumludur.',
    icon: 'file-spreadsheet',
    bulletPoints: [
      'Dinamik kolon seçimi ile şirkete özgü özel şablon raporları kaydedebilme.',
      'Geç Gelenler, Devamsızlar, İzinliler için hazır akıllı veri setleri.',
      'Belirlenen raporların yöneticilere haftalık/aylık otomatik e-postalanması.',
      'Excel, PDF ve CSV formatlarında anlık dışa aktarım.'
    ],
    tags: ['Export', 'Yasal Uyumluluk'],
  },
  {
    id: 'yonetim-panelleri',
    slug: 'yonetim-panelleri',
    title: 'Yönetim Panelleri (Dashboard)',
    category: 'raporlar-ve-analiz',
    shortDescription: 'Üst düzey yöneticiler için şirketin anlık İK ve operasyon haritası.',
    fullDescription: 'İK metriklerini görsel panellere (grafiklere) dönüştüren analiz modülüdür. Personel sirkülasyonu, devamsızlık trendleri tek ekrandan kuşbakışı izlenir.',
    icon: 'layout-dashboard',
    bulletPoints: [
      'Widget tabanlı, sürükle-bırak ile kişiselleştirilebilir panel dizaynı.',
      'Gerçek zamanlı güncellenen animasyonlu göstergeler ve KPI grafikleri.',
      'Grafiklerin üzerine tıklanarak ham verilere inebilme (Drill-down özelliği).',
      'Departmanlar ve lokasyonlar arası performans/devamsızlık kıyaslamaları.'
    ],
    tags: ['Dashboard', 'Grafikler', 'KPI'],
  },
  {
    id: 'anket-islemleri',
    slug: 'anket-islemleri',
    title: 'Anket İşlemleri',
    category: 'raporlar-ve-analiz',
    shortDescription: 'Çalışan memnuniyetini ölçmek için dahili etkileşim aracı.',
    fullDescription: 'Şirket içi kararlarda personelin görüşünü hızlıca almak, memnuniyet (NPS) veya yemekhane kalitesi gibi konularda oylama yapmak için geliştirilmiş anket modülü.',
    icon: 'bar-chart-3',
    bulletPoints: [
      'Mobil uygulama üzerinden personellere anında push bildirimli anket gönderimi.',
      'Açık uçlu, çoktan seçmeli veya puanlama tabanlı soru tipleri.',
      'Anonim veya isme dayalı katılım seçenekleri.',
      'Katılım oranları ve sonuçların gerçek zamanlı grafik analizleri.'
    ],
    tags: ['Etkileşim', 'Geri Bildirim'],
  },

  // 5. SİSTEM VE AYARLAR
  {
    id: 'coklu-lokasyon',
    slug: 'coklu-lokasyon',
    title: 'Çoklu Lokasyon',
    category: 'sistem-ve-ayarlar',
    shortDescription: 'Holding veya çok şubeli yapılar için devasa mimari.',
    fullDescription: 'Farklı lokasyonlardaki donanım ve verilerin bağımsız bölünüp, tek bir merkez çatı altında izlenmesini sağlayan enterprise çözüm.',
    icon: 'network',
    bulletPoints: [
      'Sınırsız sayıda Bölge, Şehir, Tesis ve Departman hiyerarşisi oluşturma.',
      'Cihazların ve personellerin yalnızca tanımlı olduğu lokasyonla sınırlandırılması.',
      'Bölgeye özel resmi tatil, mesai kuralları ve toleransların uygulanabilmesi.',
      'Bulut ortamında veri izolasyonu ile üst düzey güvenlik.'
    ],
    tags: ['Enterprise', 'Ölçeklenebilirlik'],
  },
  {
    id: 'kullanici-ve-rol-yonetimi',
    slug: 'kullanici-ve-rol-yonetimi',
    title: 'Kullanıcı ve Rol Yönetimi',
    category: 'sistem-ve-ayarlar',
    shortDescription: 'İnce ayarlı yetkilendirme (RBAC) ile modül bazlı erişim.',
    fullDescription: 'Uygulamayı kullanan yöneticilerin görebileceği ekranları, yapabileceği işlemleri ve erişebileceği lokasyonları detaylı olarak kısıtlayan yetki motoru.',
    icon: 'shield',
    bulletPoints: [
      'Ekran bazında Okuma, Yazma, Silme ve Onaylama yetkilerinin ayrıştırılması.',
      'Yöneticinin yalnızca kendi departmanının verilerini görebilmesi (Veri maskeleme).',
      'Yapılan tüm silme ve değiştirme işlemlerinin IP bazlı Audit Log kaydı.',
      'Active Directory / LDAP entegrasyonu (Enterprise sürümünde).'
    ],
    tags: ['Güvenlik', 'Loglama', 'Yetkilendirme'],
  },
  {
    id: 'bildirim-yonetimi',
    slug: 'bildirim-yonetimi',
    title: 'Bildirim Yönetimi',
    category: 'sistem-ve-ayarlar',
    shortDescription: 'E-posta, SMS ve Push altyapısı ile otomatize edilmiş uyarılar.',
    fullDescription: 'Sistem içerisindeki önemli olayların (izin onayı, mesai aşımı, cihaz kopması) ilgili yöneticilere doğru kanaldan anında ulaştırılmasını sağlar.',
    icon: 'bell',
    bulletPoints: [
      'Olay bazlı tetiklenen (Event-driven) bildirim kuralları kurgulama.',
      'Toplu duyuru ve kurumsal mesajların personelin mobil uygulamasına iletilmesi.',
      'Kritik durumlarda (örn. turnike arızası) teknik ekibe acil SMS gönderimi.',
      'İleti gönderim raporları ve ulaşılamayan mesajların tespiti.'
    ],
    tags: ['İletişim', 'Otomasyon'],
  },
  {
    id: 'cihaz-entegrasyonlari',
    slug: 'cihaz-entegrasyonlari',
    title: 'Cihaz Entegrasyonları',
    category: 'sistem-ve-ayarlar',
    shortDescription: 'Marka bağımsız tüm IoT terminallerinin birleştiği iletişim katmanı.',
    fullDescription: 'Farklı markalardaki biyometrik ve turnike donanımlarını (ZKTeco, Suprema, Hikvision vb.) tek bir platformda konuşturan middleware çözümüdür.',
    icon: 'cpu',
    bulletPoints: [
      'Tek bir donanım markasına mahkumiyeti (Vendor Lock-in) kaldıran açık mimari.',
      'IP üzerinden doğrudan PUSH teknolojisiyle saniyeler içinde senkronizasyon.',
      'Cihaz durumlarının (Online/Offline) anlık izlenerek Health-Check paneline yansıması.',
      'TLS 256-bit şifreleme ile ağ üzerinden geçen verilerin güvenliği.'
    ],
    tags: ['IoT', 'Donanım', 'API'],
  },
  {
    id: 'genel-bakis-ve-diger',
    slug: 'genel-bakis-ve-diger',
    title: 'Tüm Özellikler ve Genel Bakış',
    category: 'genel',
    shortDescription: 'PDKS platformunun tüm gücünü ve ek modüllerini keşfedin.',
    fullDescription: 'Listelenen ana modüllerin dışında Ziyaretçi Yönetimi, Kantin Otomasyonu, KVKK Modülü, Görev Takibi gibi işletmenizin dijital dönüşümünü tamamlayacak onlarca küçük ancak etkili özellik barındırır.',
    icon: 'layers',
    bulletPoints: [
      'Geleceğe yönelik sürekli güncellenen ve genişleyen modül kütüphanesi.',
      '3. Parti yazılımlarla RESTful API ve Webhook üzerinden veri alışverişi.',
      'Mikroservis mimarisi sayesinde kesintisiz ve yüksek performanslı hizmet.',
      'Özel geliştirme (Custom Development) taleplerine açık esnek altyapı.'
    ],
    tags: ['API', 'Mikroservis', 'Geleceğe Hazır'],
  }
];
