import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'comduty-bg',
  styleUrls: ['./bg.component.sass'],
  template: `
    <video
      loading="lazy"
      [muted]="true"
      [loop]="true"
      [autoplay]="true"
      [poster]="media + '.webp'"
    >
      <source [src]="media + '.mp4'" type="video/mp4" *ngIf="!isMobile" />
    </video>
  `,
})
export class BgComponent {
  @Input() media!: string;
  public isMobile = window.innerWidth <= 576 || window.innerHeight <= 415;
}
