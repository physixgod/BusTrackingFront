import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employees';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employee: Employee | null = null;
  selectedFile: File | null = null;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const navigation = history.state;
    if (navigation && navigation.employee) {
      this.employee = navigation.employee as Employee;
    } else {
      console.log('No employee data found in state');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.employee) {
          this.employee.employeeImageUrl = reader.result as string;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  resetImage(): void {
    if (this.employee) {
      this.employee.employeeImageUrl = '/assets/images/avatars/avatar.jpg';
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.employeeService.uploadImage(this.employee!.rfid, this.selectedFile).subscribe({
        next: (url: string) => {
          this.employee!.employeeImageUrl = url;
          this.saveEmployee();
        },
        error: (error) => {
          console.error('There was an error uploading the image', error);
        }
      });
    } else {
      alert('Please select an image to upload.');
    }
  }

  saveEmployee(): void {
    if (this.employee) {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        console.log('Employee updated successfully');
        this.router.navigate(['/EmployeesList']); 
      });
    }
  }
}
