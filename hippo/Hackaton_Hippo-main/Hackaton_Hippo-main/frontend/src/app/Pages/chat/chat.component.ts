import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatService } from '../../Services/chat.service';
import { Message } from '../../Interfaces/message.interface';
import { SessionService } from '../../Services/session.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    DatePipe,
    ScrollingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  myUsername: string = 'Anonymous';
  newMessage: string = '';
  zone: number = 3;

  messages: Message[] = [];

  constructor(
    private chatService: ChatService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.myUsername = this.sessionService.getUsername();
    const path = window.location.pathname.split('/');

    if (path.length > 2) {
      this.zone = parseInt(path[1]);
    }

    this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 3000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  fetchMessages(): void {
    this.chatService.getMessagesByZone(this.zone).subscribe((data) => {
      this.messages = data;
    });
  }

  scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  public sendMessage(): void {
    const message: Message = {
      user_pseudo: this.myUsername,
      zone: this.zone,
      message: this.newMessage,
      date_time: new Date(),
      is_admin: false,
    };
    this.chatService.sendMessage(message, this.zone).subscribe((data) => {
      this.fetchMessages();
    });
    this.newMessage = '';
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('aaa');
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
