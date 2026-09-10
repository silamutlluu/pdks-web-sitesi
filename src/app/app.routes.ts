import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FeaturesPageComponent } from './features/features-page/features-page.component';
import { HardwareComponent } from './features/hardware/hardware.component';
import { SolutionsComponent } from './features/solutions/solutions.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { SecurityComponent } from './features/security/security.component';
import { CaseStudiesComponent } from './features/case-studies/case-studies.component';
import { BlogComponent } from './features/blog/blog.component';
import { ContactComponent } from './features/contact/contact.component';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { LoginComponent } from './features/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DeviceListComponent } from './features/devices/device-list/device-list.component';
import { DeviceWizardComponent } from './features/devices/device-wizard/device-wizard.component';
import { DeviceDetailComponent } from './features/devices/device-detail/device-detail.component';
import { PageBuilderComponent } from './features/page-builder/page-builder.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Ana Sayfa | Smart PDKS Yazılımı',
    data: { description: 'Yapay zeka destekli, bulut tabanlı modern Smart PDKS çözümü. 100% KVKK uyumlu.' }
  },
  { 
    path: 'features', 
    component: FeaturesPageComponent,
    title: 'Özellikler | Smart PDKS Yazılımı',
    data: { description: 'Puantaj, İzin, Vardiya ve Fazla Mesai modüllerini keşfedin.' }
  },
  { 
    path: 'hardware', 
    component: HardwareComponent,
    title: 'Donanım & Entegrasyonlar | Smart PDKS',
    data: { description: 'Yüz tanıma, parmak izi okuyucu ve turnike geçiş sistemleri donanım uyumluluğu.' }
  },
  { 
    path: 'solutions', 
    component: SolutionsComponent,
    title: 'Sektörel Çözümler | Smart PDKS',
    data: { description: 'Fabrika, perakende, ofis ve şantiye sektörlerine özel Smart PDKS çözümleri.' }
  },
  { 
    path: 'pricing', 
    component: PricingComponent,
    title: 'Fiyatlandırma | Smart PDKS',
    data: { description: 'İşletmenizin ölçeğine uygun esnek fiyatlandırma paketleri.' }
  },
  { 
    path: 'security', 
    component: SecurityComponent,
    title: 'Güvenlik & KVKK | Smart PDKS',
    data: { description: 'Kişisel verileriniz 256-bit şifreleme ve KVKK uyumlu altyapı ile güvende.' }
  },
  { 
    path: 'case-studies', 
    component: CaseStudiesComponent,
    title: 'Müşteri Hikayeleri | Smart PDKS',
    data: { description: 'Sektör liderlerinin Smart PDKS başarı hikayeleri ve vaka çalışmaları.' }
  },
  { 
    path: 'blog', 
    component: BlogComponent,
    title: 'Blog & Kaynaklar | Smart PDKS',
    data: { description: 'En son İK trendleri, iş hukuku güncellemeleri ve Smart PDKS makaleleri.' }
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    title: 'İletişim & Demo | Smart PDKS',
    data: { description: 'Sistemimizi deneyimlemek için iletişim formu ile ücretsiz demo talebinde bulunun.' }
  },
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Giriş Yap | Smart PDKS Admin',
    data: { robots: 'noindex, nofollow' }
  },
  {
    path: 'admin',
    component: LayoutComponent,
    data: { robots: 'noindex, nofollow' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'devices', component: DeviceListComponent },
      { path: 'devices/add', component: DeviceWizardComponent },
      { path: 'devices/:id', component: DeviceDetailComponent },
      { path: 'assignments', loadComponent: () => import('./features/assignments/assignments.component').then(m => m.AssignmentsComponent) },
      { path: 'page-builder', component: PageBuilderComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
