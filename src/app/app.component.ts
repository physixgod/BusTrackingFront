import { Component } from '@angular/core';
import { MqttService } from './Services/mqtt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'busTracking';
  message: string = '';

  constructor(private mqttService: MqttService) {}
  ngOnInit(): void {


  }
  sendMessage() {
    
      this.mqttService.publishMessage().subscribe((response: any) => {
        console.log('Message sent:', response);
      }, (error: any) => {
        console.error('Error sending message:', error);
      });
    } 
  
}

