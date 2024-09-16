import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employees';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

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
  file: File | null = null;
  employees: Employee[] = [];
  showSaveButton: boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router) { }

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
  onExcelFileSelected(event: any): void {
    this.file = event.target.files[0];
    this.showSaveButton = true;
  }

  uploadEmployees(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

        this.employees = json.slice(1).map((row: any) => ({
          rfid: row[0],
          employeeFirstName: row[1],
          employeeLastName: row[2],
          matricule: row[3],
          department: row[4],
          email: row[5],
          region: row[6],
          gouvernement: row[7],
          adresse: '',
          pointedBus: false,
          pointedIn: false,
          pointedOut: false,
          employeeImageUrl: '',
          trackingEvents: []
        }));
        this.addEmployees(this.employees);
        console.log('Employees extracted from Excel:', this.employees);
      };
      reader.readAsArrayBuffer(this.file);
    }
  }
  addEmployees(employees: Employee[]): void {
    this.employeeService.addEmployees(employees).subscribe({
      next: (response) => {
        console.log('Employees added successfully', response);
        // Handle successful response
        this.router.navigate(['/EmployeesList']);
      },
      error: (error) => {
        console.error('There was an error adding the employees', error);
      }
    });
  }

  

  uploadImage(): void {
    if (this.uploadedImage) {
      this.employeeService.uploadImage(this.employeeId, this.uploadedImage).subscribe({
        next: (response) => {
          console.log('Employee image uploaded successfully', response);
          this.router.navigate(['/EmployeesList']);
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
