import { Patient } from './patient.model';

export class WaitPatient{
    id : number;
    type: string;
    requestedOn: Date;
    patient: Patient
}