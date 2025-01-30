import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ActivityComponent } from '../../Components/activity/activity.component';
import { DisasterInfoComponent } from '../../Components/disaster-info/disaster-info.component';

@Component({
  selector: 'app-info',
  imports: [MatIconModule, ActivityComponent, DisasterInfoComponent],
  standalone: true,
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  zone: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const segments = this.router.url.split('/');
    this.zone = segments[1];
  }
}
