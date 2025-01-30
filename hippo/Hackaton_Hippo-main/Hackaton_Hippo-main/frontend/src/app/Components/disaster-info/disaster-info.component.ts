import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DisasterInfo, InfoService } from '../../Services/info.service';

@Component({
  selector: 'app-disaster-info',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './disaster-info.component.html',
  styleUrl: './disaster-info.component.scss',
})
export class DisasterInfoComponent {
  disastersInfo: DisasterInfo[] = [];

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    const zone = 1;
    this.infoService.getDisaster(zone).subscribe((data) => {
      console.log(data);

      this.disastersInfo = data;
    });
  }
}
