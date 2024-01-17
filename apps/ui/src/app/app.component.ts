import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    DashboardModule,
  ],
  selector: 'comduty-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
