import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private apiUrl = 'http://localhost:8001/activity'; // Remplacez par l'URL réelle de l'API

  constructor(private http: HttpClient) {}

  getActivity(zone: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/?zone=${zone}`);
  }
}
export interface Activity {
  activity_id: number;
  title: string;
  description: string;
  url_illustration: string | null;
  is_available: boolean;
  zone: string;
  type: string;
}
