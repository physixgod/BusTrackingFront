import { Societe } from "./Societe";

export class User {
    login!: string;
    password!: string;
    societe?: Societe;
    societeId?: number;
}