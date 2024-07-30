import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EventsService } from 'src/app/Services/events.service';
import { TrackingEvent } from 'src/app/models/TrackingEvent';

@Component({
  selector: 'app-bus-pointing-events',
  templateUrl: './bus-pointing-events.component.html',
  styleUrls: ['./bus-pointing-events.component.css']
})
export class BusPointingEventsComponent implements OnInit {
  trackingEvents: TrackingEvent[] = [];
  filteredTrackingEvents: TrackingEvent[] = [];
  searchName: string = '';

  constructor(
    private eventsService: EventsService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadTodayEventsByEmployees();
  }

  loadTodayEventsByEmployees(): void {
    this.eventsService.getTodayEventsByEmployees().subscribe({
      next: (events) => {
        console.log('API response:', events);
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
    console.log(this.searchName);
    if (this.searchName) {
      this.filteredTrackingEvents = this.trackingEvents.filter(event =>
        event.employeeFirstName?.toLowerCase().includes(this.searchName.toLowerCase())
      );
      console.log(this.filteredTrackingEvents);
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
          console.log(event.employeePhotoUrl);
        }
      },
      error: (error) => {
        console.error('There was an error retrieving the image', error);
      }
    });
  }

  showEventHistory(eventId: number): void {
    // Implement this method to show event history
  }
}
