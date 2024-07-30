import { TrackingEvent } from "./TrackingEvent";

export class Employee {
    matricule!: string;
    rfid!: number;
    employeeFirstName!: string;
    employeeLastName!: string;
    adresse!: string;
    region!: string;
    gouvernement!: string;
    pointedBus!: boolean;
    pointedIn!: boolean;
    pointedOut!: boolean;
    trackingEvents!: TrackingEvent[];
    employeeImageUrl!:string;
}