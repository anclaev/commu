import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';

@Component({
  standalone: true,
  imports: [RouterModule, AuthModule, DashboardModule],
  selector: 'comduty-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
