import { Component } from '@angular/core';
import { DriverService } from 'src/app/Services/driver.service';
import { Driver } from 'src/app/models/driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent {
  driver: Driver = {
    code: 0,
    cin: 0,
    rfidChauf: 0,
    nom: '',
    prenom: '',
    immatriculation: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private driverService: DriverService) { }

  addDriver() {
    this.driverService.addDriver(this.driver).subscribe({
      next: (response) => {
        this.successMessage = 'Driver added successfully!';
        this.errorMessage = null;
        // Optionally reset the form after successful submission
        this.driver = {
          code: 0,
          cin: 0,
          rfidChauf: 0,
          nom: '',
          prenom: '',
          immatriculation: ''
        };
      },
      error: (err) => {
        this.errorMessage = 'Error adding driver: ' + err.message;
        this.successMessage = null;
      }
    });
  }
}
