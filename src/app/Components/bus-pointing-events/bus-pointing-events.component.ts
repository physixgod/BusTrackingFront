import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EventsService } from 'src/app/Services/events.service';
import { TrackingEvent } from 'src/app/models/TrackingEvent';
import { Employee } from 'src/app/models/employees';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bus-pointing-events',
  templateUrl: './bus-pointing-events.component.html',
  styleUrls: ['./bus-pointing-events.component.css']
})
export class BusPointingEventsComponent implements OnInit {
  trackingEvents: TrackingEvent[] = [];
  filteredTrackingEvents: TrackingEvent[] = [];
  searchName: string = '';
  monthlyEvents: TrackingEvent[] = [];

  constructor(
    private eventsService: EventsService,
    private employeeService: EmployeeService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadTodayEventsByEmployees();
    this.eventsService.getMonthlyEvents().subscribe({
      next: (monthlyEvents) => {
        console.log('API response:', monthlyEvents);
        this.monthlyEvents = monthlyEvents; 
      }
    });
  }

  loadTodayEventsByEmployees(): void {
    this.eventsService.getTodayEventsByEmployees().subscribe({
      next: (events) => {
        this.trackingEvents = events;
        this.filteredTrackingEvents = events;
        this.trackingEvents.forEach(event => this.loadEmployeeImage(event));
      },
      error: (err) => {
        console.error('Error loading today\'s events by employees:', err);
      }
    });
  }

  onSearch(): void {
    if (this.searchName) {
      this.filteredTrackingEvents = this.trackingEvents.filter(event =>
        event.employeeFirstName?.toLowerCase().includes(this.searchName.toLowerCase())
      );
    } else {
      this.filteredTrackingEvents = this.trackingEvents;
    }
  }

  loadEmployeeImage(event: TrackingEvent): void {
    this.employeeService.getEmployeeImage(event.rfid).subscribe({
      next: (response) => {
        let reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          event.employeePhotoUrl = reader.result as string;
        }
      },
      error: (error) => {
        console.error('There was an error retrieving the image', error);
      }
    });
  }

  showEventHistory(rfid:number): void {
    console.log(rfid);
     this.employeeService.getEmployeeByEvent(rfid).subscribe({
      next: (employeeId) => {
        this.employeeService.getEmployeeByRFID(employeeId).subscribe({
          next: (employee) => {
            this.router.navigate(['/EmployeeHistory'], { state: { employee } });
          },
          error: (error) => {
            console.error('Error fetching employee details by RFID:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching employee ID by event:', error);
      }
    });
  }

  isTimePending(time: Date): boolean {
    return time && time.getHours() === 0 && time.getMinutes() === 0 && time.getSeconds() === 0;
  }

  downloadExcel() {
    if (!this.monthlyEvents.length) {
      console.error('No monthly events available to export.');
      return;
    }

    const workbook = XLSX.utils.book_new();
    const eventsByDay = this.groupEventsByDay(this.monthlyEvents);

    for (const [day, events] of Object.entries(eventsByDay)) {
      const worksheetData = events.map(event => {
        const timestamp = new Date(event.timestamp);
        const pointingIn = this.convertToDate(event.pointingIn);
        const pointingOut = this.convertToDate(event.pointingOut);

        return {
          'RFID': event.rfid,
          'First Name': event.employeeFirstName,
          'Last Name': event.employeeLastName,
          'Boarding Time': timestamp.toLocaleTimeString(),
          'Arrival Time': pointingIn && (pointingIn.getHours() !== 0 || pointingIn.getMinutes() !== 0 || pointingIn.getSeconds() !== 0) 
            ? pointingIn.toLocaleTimeString() 
            : 'N/A',
          'Departure Time': pointingOut && (pointingOut.getHours() !== 0 || pointingOut.getMinutes() !== 0 || pointingOut.getSeconds() !== 0) 
            ? pointingOut.toLocaleTimeString() 
            : 'N/A',
        };
      });
      const eventDate = new Date(events[0].timestamp);
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthName = monthNames[eventDate.getMonth()];
      const sheetName = `${day} ${monthName}`;

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
    const now = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthName = monthNames[now.getMonth()];
    const currentYear = now.getFullYear();
    const fileName = `${currentMonthName}_${currentYear}_Events.xlsx`;

    XLSX.writeFile(workbook, fileName);
  }

  private convertToDate(value: any): Date | null {
    if (!value) return null;
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }

  private groupEventsByDay(events: TrackingEvent[]): { [day: string]: TrackingEvent[] } {
    return events.reduce((acc, event) => {
      const day = new Date(event.timestamp).getDate().toString();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(event);
      return acc;
    }, {} as { [day: string]: TrackingEvent[] });
  }

}
