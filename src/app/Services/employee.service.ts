import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackingEvent } from '../models/TrackingEvent';
import { Employee } from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'http://localhost:5174/bustracking/Employee'; 
    constructor(private http: HttpClient) { }
    addEmployee(employee: Employee): Observable<Employee> {
      return this.http.post<Employee>(`${this.apiUrl}/AddEmployee`, employee);
    }
    uploadImage(rfid: number, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
    
        return this.http.post<any>(`${this.apiUrl}/upload-image/${rfid}`, formData, {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        });
    }
    getEmployeeImage(rfid: number): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/get_image/${rfid}`, { responseType: 'blob' });
    }
    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}/GetAllEmployees`);
      }
  
  }
  