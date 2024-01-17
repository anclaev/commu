import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { BgComponent } from './shared/bg/bg.component';
import { randomNum } from './shared/utils';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    BgComponent,
  ],
  selector: 'comduty-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public background: string;

  constructor() {
    this.background =
      'https://github.com/anclaev/vanne-ng-legacy/raw/main/src/assets/media/bg/' +
      randomNum(1, 2) +
      '-v1';
  }
}
