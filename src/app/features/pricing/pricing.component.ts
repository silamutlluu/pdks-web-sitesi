import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  selectedPackageId: string = 'professional';
  isYearly: boolean = true;

  selectPackage(id: string) {
    this.selectedPackageId = id;
  }

  toggleBillingPeriod() {
    this.isYearly = !this.isYearly;
  }
}
