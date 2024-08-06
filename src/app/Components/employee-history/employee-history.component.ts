import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employees';
import { EventsService } from 'src/app/Services/events.service';
import { TrackingEvent } from 'src/app/models/TrackingEvent';

@Component({
  selector: 'app-employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.css']
})
export class EmployeeHistoryComponent implements OnInit {
  employee: Employee | null = null;
  trackingEvents: TrackingEvent[] = [];
  monthName: string = '';
  employeeName: string = '';

  constructor(
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const navigation = history.state;
    if (navigation && navigation.employee) {
      this.employee = navigation.employee as Employee;
      if (this.employee) {
        this.loadEmployeeHistory(this.employee.rfid);
      }
    } else {
      console.log('No employee data found in state');
    }
  }

  private loadEmployeeHistory(rfid: number): void {
    this.eventsService.getMonthlyEventsByEmployee(rfid).subscribe({
      next: (events) => {
        this.trackingEvents = events;
        this.setMonthName();
        this.employeeName=this.trackingEvents[0].employeeFirstName+" "+this.trackingEvents[0].employeeLastName;
      },
      error: (error) => {
        console.error('Error loading employee history:', error);
      }
    });
  }
  setMonthName(): void {
    if (this.trackingEvents.length > 0) {
      const firstEventDate = new Date(this.trackingEvents[0].timestamp);
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      this.monthName = monthNames[firstEventDate.getMonth()];
    }
  }
}
