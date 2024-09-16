import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../models/Bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private baseUrl = 'http://localhost:5174/bustracking/Bus'; 

  constructor(private http: HttpClient) { }

  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${this.baseUrl}/AddBus`, bus);
  }


  setCircuitForBus(busId: string, circuitId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/SetCircuitForBus/${busId}/${circuitId}`, {});
  }

  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.baseUrl}/GetAllBuses`);
  }
}
