import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Employee } from 'src/app/models/employees';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchName: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.filteredEmployees = employees;
        this.employees.forEach((employee) => this.loadEmployeeImage(employee));
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      },
    });
  }

  onSearch(): void {
    console.log(this.searchName);
    if (this.searchName) {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.employeeFirstName
          .toLowerCase()
          .includes(this.searchName.toLowerCase())
      );
      console.log(this.filteredEmployees);
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  loadEmployeeImage(employee: Employee): void {
    this.employeeService.getEmployeeImage(employee.rfid).subscribe({
      next: (response) => {
        let reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          employee.employeeImageUrl = reader.result as string;
        };
      },
      error: (error) => {
        console.error('There was an error retrieving the image', error);
      },
    });
  }
  showProfile(employee: Employee): void {
    this.router.navigate(['/EmployeeProfile'], { state: { employee } });
  }
  downloadExcel() {
    const data = this.employees.map((employee) => ({
      'First Name': employee.employeeFirstName,
      'Last Name': employee.employeeLastName,
      'Registration Number': employee.matricule,
      Department: employee.department,
      Email: employee.email,
      Region: employee.region,
      Government: employee.gouvernement,
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { Employees: worksheet },
      SheetNames: ['Employees'],
    };
    XLSX.writeFile(workbook, 'EmployeeList.xlsx');
  }
}
