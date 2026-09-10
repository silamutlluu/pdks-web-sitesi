import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MobileNavComponent } from './layout/mobile-nav/mobile-nav.component';
import { MobileBottomBarComponent } from './layout/mobile-bottom-bar/mobile-bottom-bar.component';
import { SeoService } from './core/services/seo.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent, SidebarComponent, MobileNavComponent, MobileBottomBarComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pdks-frontend';

  constructor(private seoService: SeoService) {
    this.seoService.init();
  }
}
