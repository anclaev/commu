import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { enterOpacity } from '../../core/animations/enterOpacity';

import { LoaderService } from './loader.service';

@Component({
  selector: 'comduty-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  animations: [enterOpacity(1000)],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent implements OnInit, OnDestroy {
  status: boolean = false;

  private unsubscribe: Subscription[] = [];

  constructor(public loader: LoaderService) {}

  ngOnInit(): void {
    this.unsubscribe.push(
      this.loader.loading$.subscribe((val) => (this.status = val))
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
