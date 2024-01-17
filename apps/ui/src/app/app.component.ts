import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Component({
  standalone: true,
  imports: [RouterModule, SharedModule, AuthModule, DashboardModule],
  selector: 'comduty-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
