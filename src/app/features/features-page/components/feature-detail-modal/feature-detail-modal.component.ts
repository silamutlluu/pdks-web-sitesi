import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { IFeatureItem } from '../../../../core/models/feature.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-detail-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './feature-detail-modal.component.html',
  styleUrl: './feature-detail-modal.component.scss'
})
export class FeatureDetailModalComponent {
  @Input() feature: IFeatureItem | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.isOpen = false;
    // Emit close event after animation finishes (300ms)
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }

  // Prevent closing when clicking inside the modal content
  onContentClick(event: Event) {
    event.stopPropagation();
  }
}
