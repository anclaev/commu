import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';

import { enterOpacity } from './core/animations/enterOpacity';

import { AuthService } from './auth/auth.service';

import { LoaderComponent } from './shared/loader/loader.component';
import { QuoteComponent } from './shared/quote/quote.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularSvgIconModule,
    AuthModule,
    DashboardModule,
    QuoteComponent,
    LoaderComponent,
  ],
  animations: [enterOpacity(300)],
  selector: 'commu-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private auth = inject(AuthService);

  private unsubscribe: Subscription[] = [];

  isAuthenticated: boolean = false;

  constructor() {
    this.auth.user$.subscribe((val) => (this.isAuthenticated = !!val));
  }

  logout() {
    this.unsubscribe.push(
      this.auth.logout().subscribe({
        next: () => {
          this.unsubscribe.forEach((sb) => sb.unsubscribe());
        },
      })
    );
  }
}
