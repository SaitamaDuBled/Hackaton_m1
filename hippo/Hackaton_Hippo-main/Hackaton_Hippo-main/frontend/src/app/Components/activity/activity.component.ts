import { Component } from '@angular/core';
import { Activity, ActivityService } from '../../Services/activity.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    const zone = 1; // Replace with the appropriate zone value
    this.activityService.getActivity(zone).subscribe((data) => {
      this.activities = data;
    });
  }
}
