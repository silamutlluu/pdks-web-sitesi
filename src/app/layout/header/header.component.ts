import { Component, HostListener, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { FeaturesMegaMenuComponent } from '../features-mega-menu/features-mega-menu.component';
import { SolutionsMegaMenuComponent } from '../solutions-mega-menu/solutions-mega-menu.component';
import { CommonModule } from '@angular/common';
import { MobileNavService } from '../../core/services/mobile-nav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, FeaturesMegaMenuComponent, SolutionsMegaMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private eRef = inject(ElementRef);
  private mobileNavService = inject(MobileNavService);
  private platformId = inject(PLATFORM_ID);
  isMegaMenuOpen = false;
  isSolutionsMenuOpen = false;

  toggleMegaMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isMegaMenuOpen = !this.isMegaMenuOpen;
    this.isSolutionsMenuOpen = false;
  }

  toggleSolutionsMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isSolutionsMenuOpen = !this.isSolutionsMenuOpen;
    this.isMegaMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if ((this.isMegaMenuOpen || this.isSolutionsMenuOpen) && !this.eRef.nativeElement.contains(event.target)) {
      this.isMegaMenuOpen = false;
      this.isSolutionsMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.isMegaMenuOpen = false;
  }

  toggleMobileNav() {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileNavService.toggle();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
