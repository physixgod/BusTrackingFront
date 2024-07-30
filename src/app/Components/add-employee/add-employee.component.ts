import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employees';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: Employee = new Employee();
  employeeAdded: boolean = false;
  uploadedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  employeeId: number = 0;

  constructor(private employeeService: EmployeeService) { }

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employee added successfully', response);
        this.employeeId = response.rfid;
        this.employeeAdded = true;
        if (this.uploadedImage) {
          this.uploadImage();
        }
      },
      error: (error) => {
        console.error('There was an error adding the employee', error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  uploadImage(): void {
    if (this.uploadedImage) {
      this.employeeService.uploadImage(this.employeeId, this.uploadedImage).subscribe({
        next: (response) => {
          console.log('Employee image uploaded successfully', response);
          this.getEmployeeImage();
        },
        error: (error) => {
          console.error('There was an error uploading the image', error);
        }
      });
    } else {
      alert('Please select an image to upload.');
    }
  }

  getEmployeeImage(): void {
    this.employeeService.getEmployeeImage(this.employeeId).subscribe({
      next: (response) => {
        let reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.imageUrl = reader.result;
        }
      },
      error: (error) => {
        console.error('There was an error retrieving the image', error);
      }
    });
  }
}
