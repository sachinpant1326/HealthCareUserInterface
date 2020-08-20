import { DiagnosticTest } from './diagnostic-test.model';
import { Patient } from './patient.model';
import { TestResult } from './test-result.model';
import { DiagnosticCenter } from './center.model';

export class Appointment{
    id: number;
    appointmentDate: Date;
    approvalStatus: number;
    diagnosis: string;
    symptoms: string;
    diagnosticTest: DiagnosticTest;
    patient: Patient;
    testResult: TestResult;
    diagnosticCenter: DiagnosticCenter
}