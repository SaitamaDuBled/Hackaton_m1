import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alert',
  imports: [ToastModule, ButtonModule, RippleModule],
  providers:[MessageService],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
   constructor(private messageService: MessageService) {}
    
    show() {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Seisme en cours !' });
    }
    
}
