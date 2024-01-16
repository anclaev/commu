import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Component({
  standalone: true,
  imports: [RouterModule, AuthModule, DashboardModule],
  selector: 'comduty-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
