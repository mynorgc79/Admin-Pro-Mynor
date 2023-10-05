import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

import { AdminLayoutComponent } from './admin-layout.component';
import {
  FooterComponent,
  HeaderComponent,
  BreadcrumsComponent,
  SidebarComponent,
} from './components';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumsComponent,
    SidebarComponent,
    AdminLayoutComponent,
  ],
  imports: [CommonModule, AdminLayoutRoutingModule, FontAwesomeModule],
})
export class AdminLayoutModule {}
