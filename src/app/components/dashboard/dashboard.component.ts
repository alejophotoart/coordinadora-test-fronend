import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    MatSidenavModule,
    SideBarComponent,
    HeaderComponent,
  ],
})
export class DashboardComponent {

}
