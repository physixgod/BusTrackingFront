import { Component } from '@angular/core';
import { MqttService } from './Services/mqtt.service';
import { SignalRService } from './Services/signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'busTracking';
  message: string = '';

  constructor(private mqttService: MqttService,private signalRService: SignalRService) {}
  ngOnInit(): void {
 /*   this.signalRService.currentMessage.subscribe(message => {
      this.message = message;
      alert('New tracking event: ' + this.message); // Handle the message (e.g., display it in an alert)
    });*/

  }
  sendMessage() {
    
      this.mqttService.publishMessage().subscribe((response: any) => {
        console.log('Message sent:', response);
      }, (error: any) => {
        console.error('Error sending message:', error);
      });
    } 
  
}

