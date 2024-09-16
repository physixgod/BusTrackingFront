import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Circuit } from '../models/circuit';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  private baseUrl = 'http://localhost:5174/bustracking/Circuit'; 

  constructor(private http: HttpClient) { }

  addCircuit(circuit: Circuit): Observable<Circuit> {
    return this.http.post<Circuit>(`${this.baseUrl}/AddCircuit`, circuit);
  }
  getAllCircuits(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(`${this.baseUrl}/GetAllCircuit`);
  }
  setCollectPointsToCircuit(circuitId: string, collectPointId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/SetCollectPointsToCircuit/${circuitId}/${collectPointId}`, {});
  }

  setEmployeeToCircuit(circuitId: string, employeeId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/SetEmployeeToCircuit/${circuitId}/${employeeId}`, {});
  }
}
