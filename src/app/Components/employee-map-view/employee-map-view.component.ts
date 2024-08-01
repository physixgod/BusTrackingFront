import {
  Component,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TrackingEvent } from 'src/app/models/TrackingEvent';
import { EventsService } from 'src/app/Services/events.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-employee-map-view',
  templateUrl: './employee-map-view.component.html',
  styleUrls: ['./employee-map-view.component.css'],
})
export class EmployeeMapViewComponent implements AfterViewInit {
  trackingEvents: TrackingEvent[] = [];
  map: any;
  defaultImageUrl: string = '/assets/images/avatars/avatar.jpg';

  constructor(
    private employeeService: EmployeeService,
    private eventsService: EventsService,
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet')
        .then((leaflet) => {
          this.map = leaflet
            .map(this.elementRef.nativeElement.querySelector('#map'))
            .setView([36.8065, 10.1815], 13.35);

          leaflet
            .tileLayer(
              'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
              {
                maxZoom: 20,
                attribution:
                  '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              }
            )
            .addTo(this.map);
          this.loadTodayEventsByEmployees();
        })
        .catch((error) => {
          console.error('Error loading Leaflet', error);
        });
    }
  }

  loadTodayEventsByEmployees(): void {
    this.eventsService.getTodayEventsByEmployees().subscribe({
      next: (events) => {
        console.log('API response:', events);
        this.trackingEvents = events;

        this.trackingEvents.forEach((event) => this.loadEmployeeImage(event));
      },
      error: (err) => {
        console.error("Error loading today's events by employees:", err);
      },
    });
  }

  loadEmployeeImage(event: TrackingEvent): void {
    this.employeeService.getEmployeeImage(event.rfid).subscribe({
      next: (response) => {
        let reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          event.employeePhotoUrl = reader.result as string;
          this.addMarker(event);
        };
      },
      error: (error) => {
        console.error('There was an error retrieving the image', error);
        event.employeePhotoUrl = this.defaultImageUrl;
        this.addMarker(event);
      },
    });
  }

  addMarker(event: TrackingEvent): void {
    const iconHtml = `
    <div
      data-bs-toggle="tooltip"
      data-popup="tooltip-custom"
      data-bs-placement="top"
      class="avatar avatar-xs pull-up"
      title="${event.employeeFirstName} ${event.employeeLastName}"
      style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;"
    >
      <img src="${event.employeePhotoUrl}" alt="Avatar" style="width: 100%; height: auto;" />
    </div>`;

    const icon = L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25],
    });

    L.marker([event.latitude, event.longitude], { icon })
      .addTo(this.map)
      .bindPopup(
        `<img src="${event.employeePhotoUrl}" alt="Employee Photo" width="100" height="100"><br>${event.employeeFirstName} ${event.employeeLastName}`
      );
  }

  addTestMarker(): void {
    const myIcon = L.divIcon({
      html: `
        <
          data-bs-toggle="tooltip"
          data-popup="tooltip-custom"
          data-bs-placement="top"
          class="avatar avatar-xs pull-up"
          title="Test User"
        >
          <img src="/assets/images/avatars/1.png" alt="Avatar" class="rounded-circle" />
        `,
      className: '',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25],
    });

    L.marker([36.25, 10], { icon: myIcon })
      .addTo(this.map)
      .bindPopup('Test Marker');
    console.log('Adding icon ');
  }
}
