import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5174/trackingEventHub')
      .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageSource.next(message); 
    });
  }
}
