import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this

@Component({
  selector: 'app-info-card',
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() year: string = '';
  @Input() count: string = '';
  @Input() label: string = '';
  @Input() bgColor: string = 'bg-white'; 
}
