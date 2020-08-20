import { Appointment } from 'src/app/center/models/appointment.model';

export class WaitingPatient{
    id : number;
    appointment : Appointment;
    type : string;
    requestedOn : Date;
}