import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl = 'http://localhost:5174/bustracking/Device'; 

  constructor(private http: HttpClient) { }

  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${this.baseUrl}/AddDevice`, device);
  }

  assignDeviceToBus(deviceId: number, busImmatriculation: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/AssignDeviceToBus/${deviceId}/${busImmatriculation}`, {});
  }

  getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}/GetAllDevice`);
  }
}
