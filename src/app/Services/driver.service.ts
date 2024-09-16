import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private baseUrl = 'http://localhost:5174/bustracking/Driver' ; 

  constructor(private http: HttpClient) { }


  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.baseUrl}/AddDriver`, driver);
  }


  assignDriverToBus(idDriver: number, idBus: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/AssignDriverToBus/${idDriver}/${idBus}`, {});
  }

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.baseUrl}/GetAllDriver`);
  }
}
