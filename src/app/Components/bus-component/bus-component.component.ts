import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/Bus';
import { BusService } from 'src/app/Services/bus.service';

@Component({
  selector: 'app-bus-component',
  templateUrl: './bus-component.component.html',
  styleUrls: ['./bus-component.component.css']
})
export class BusComponentComponent {

  bus: Bus = new Bus();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private busService: BusService, private router: Router) {}

  addBus(): void {
    this.busService.addBus(this.bus).subscribe({
      next: (response) => {
        this.successMessage = 'Bus added successfully!';
        this.errorMessage = '';
        console.log('Bus added successfully', response);
        this.router.navigate(['/BusDetails']);  
      },
      error: (error) => {
        this.errorMessage = 'There was an error adding the Bus';
        this.successMessage = '';
        console.error('There was an error adding the Bus', error);
      }
    });
  }
}