import { Appointment } from './appointment.model';
import { DiagnosticCenter } from './center.model';

export class Bed{
    id : number;
    occupied : boolean;
    pricePerDay : number;
    appointment : Appointment;
    diagnosticCenter : DiagnosticCenter;
}