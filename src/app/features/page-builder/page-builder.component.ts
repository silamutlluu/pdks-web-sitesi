import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { LucideAngularModule } from 'lucide-angular';

interface PageBlock {
  id: string;
  type: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-page-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, LucideAngularModule],
  templateUrl: './page-builder.component.html',
  styleUrl: './page-builder.component.scss'
})
export class PageBuilderComponent {
  availableBlocks: PageBlock[] = [
    { id: 'h1', type: 'hero', title: 'Hero Section', icon: 'layout-template' },
    { id: 'f1', type: 'features', title: 'Özellikler Grid', icon: 'grid' },
    { id: 't1', type: 'text', title: 'Zengin Metin (Rich Text)', icon: 'file-text' },
    { id: 'c1', type: 'cta', title: 'CTA Banner', icon: 'megaphone' },
    { id: 'q1', type: 'faq', title: 'Sıkça Sorulan Sorular', icon: 'help-circle' }
  ];

  activeBlocks: PageBlock[] = [
    { id: 'active-1', type: 'hero', title: 'Hero Section', icon: 'layout-template' }
  ];

  selectedBlock: PageBlock | null = null;
  
  // Rich Text Editor Content (Mock)
  htmlContent = '<h1>PDKS Yeni Modülümüz Yayında!</h1><p>Bu metin alanı <strong>Quill</strong> Zengin Metin Editörü kullanılarak oluşturulmuştur.</p>';

  addBlock(block: PageBlock) {
    const newBlock = { ...block, id: 'active-' + Date.now() };
    this.activeBlocks.push(newBlock);
  }

  removeBlock(index: number) {
    this.activeBlocks.splice(index, 1);
    this.selectedBlock = null;
  }

  selectBlock(block: PageBlock) {
    this.selectedBlock = block;
  }
}
