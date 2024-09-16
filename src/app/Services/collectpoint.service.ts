import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectPoints } from '../models/collectpoint';

@Injectable({
  providedIn: 'root'
})
export class CollectPointService {
  private baseUrl = 'http://localhost:5174/bustracking/CollectPoint'; 

  constructor(private http: HttpClient) { }

  // Method to add a collect point
  addCollectPoint(collectPoint: CollectPoints): Observable<CollectPoints> {
    return this.http.post<CollectPoints>(`${this.baseUrl}/AddCollectPoint`, collectPoint);
  }

  // Method to get all collect points
  getAllCollectPoints(): Observable<CollectPoints[]> {
    return this.http.get<CollectPoints[]>(`${this.baseUrl}/GetAllCollectPoints`);
  }
}
