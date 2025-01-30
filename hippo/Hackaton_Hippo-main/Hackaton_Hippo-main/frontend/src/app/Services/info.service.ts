import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8001/alert'; // R

  getDisaster(zone: number): Observable<DisasterInfo[]> {
    return this.http.get<DisasterInfo[]>(`${this.apiUrl}/?zone=${zone}`);
  }
}
export interface DisasterInfo {
  disaster_Id: number;
  title: string;
  zones: string;
  type: string;
  date: string;
  level: string;
}
