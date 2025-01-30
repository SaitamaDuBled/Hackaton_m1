import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDrawerContainer,
  MatDrawer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
})
export class HeaderComponent {
  showMenu = false; // Par défaut, le menu n'est pas affiché
  zone: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const segments = this.router.url.split('/');
      this.zone = segments[1];
      if (
        this.router.url.includes('/info') ||
        this.router.url.includes('/chat')
      ) {
        this.showMenu = true;
      }
    });
  }
}
