import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private apiUrl = 'http://localhost:5000/publish'; 

  constructor(private http: HttpClient) { }

publishMessage(): Observable<string> {
    // Return an Observable of type string
    return this.http.post<string>(this.apiUrl, { responseType: 'text' as 'json' });
  }
}
