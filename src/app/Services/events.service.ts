import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackingEvent } from '../models/TrackingEvent';
import { Employee } from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:5174/bustracking/events'; 

  constructor(private http: HttpClient) { }
  getTodayEvents(): Observable<TrackingEvent[]> {
    return this.http.get<TrackingEvent[]>(`${this.apiUrl}/getTodayEvents`);
  }
  getTodayEventsByEmployees(): Observable<TrackingEvent[]> {
    return this.http.get<TrackingEvent[]>(`${this.apiUrl}/getTodayEventsByEmployees`);
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/AddEmployee`, employee);
  }

}
