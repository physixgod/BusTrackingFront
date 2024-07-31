import { Societe } from "./Societe";

export class User {
    login!: string;
    password!: string;
    email!: string;      
    societe?: Societe;
    societeId?: number;
    codeP?: string;     
}