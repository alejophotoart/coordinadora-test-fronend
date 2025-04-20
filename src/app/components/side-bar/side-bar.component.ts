import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ],
})
export class SideBarComponent {

  isExpanded = true;
  
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Analytics', icon: 'analytics', route: '/analytics' },
    { label: 'Projects', icon: 'work', route: '/projects' },
    { label: 'Calendar', icon: 'calendar_today', route: '/calendar' },
    { label: 'Messages', icon: 'message', route: '/messages' },
    { label: 'Team', icon: 'people', route: '/team' }
  ];


  reason = '';

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}
