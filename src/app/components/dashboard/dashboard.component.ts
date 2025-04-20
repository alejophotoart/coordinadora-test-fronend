import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    MatSidenavModule,
    SideBarComponent,
    HeaderComponent,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class DashboardComponent {

}
