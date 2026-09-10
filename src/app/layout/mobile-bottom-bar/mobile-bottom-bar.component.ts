import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mobile-bottom-bar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './mobile-bottom-bar.component.html',
  styleUrl: './mobile-bottom-bar.component.scss'
})
export class MobileBottomBarComponent {

}
