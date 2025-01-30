import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../Interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8001/chats'; // Remplacez par l'URL réelle de l'API

  constructor(private http: HttpClient) {}

  getMessagesByZone(zone: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/all?zone=${zone}`);
  }

  sendMessage(message: Message, zone: number): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/add`, message);
  }
}
