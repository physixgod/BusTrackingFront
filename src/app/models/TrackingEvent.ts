import { Employee } from "./employees";

export class TrackingEvent {
    trackingEventID!: number;
    timestamp!: Date;
    deviceID!: number;
    longitude!: number;
    latitude!: number;
    rfid!: number;
    employeeFirstName?: string;  
    employeeLastName?: string;   
    employeePhotoUrl!:string;
    pointingIn!:Date;
    pointingOut!:Date; 
}