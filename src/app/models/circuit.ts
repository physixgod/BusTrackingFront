import { CollectPoints } from "./collectpoint";
import { Employee } from "./employees";

export class Circuit {
    idCircuit!: string;
    libelle!: string;
    distance!: number;
    gouv!: string;
    region!: string;
    duration!: number;

    immatriculation?: string;
    collectPointsCollection?: CollectPoints[];
    employeesCollection?: Employee[];
}