import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5174/bustracking/user'; 

  constructor(private http: HttpClient) { }
  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ForgetPassword`, { email });
  }
  resetPassword(resetCode: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ResetPassword`, { resetCode, newPassword });
  }
  login(loginRequest: { login: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, loginRequest);
  }
  register(userRequest: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, userRequest);
  }
}
