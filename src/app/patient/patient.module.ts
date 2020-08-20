import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { VacantBedComponent } from './vacant-bed/vacant-bed.component';
import { MyBedComponent } from './my-bed/my-bed.component';
import { AllTestComponent } from './all-test/all-test.component';
import { DiagCenterComponent } from './diag-center/diag-center.component';
import { AppointmentService } from './services/appointment.service';
import { PatientService } from './services/patient.service';
import { ViewAllAppointmentComponent } from './view-all-appointment/view-all-appointment.component';
import { ViewMyAppointmentComponent } from './view-my-appointment/view-my-appointment.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { TestResultComponent } from './test-result/test-result.component';
import { ViewBedComponent } from './view-bed/view-bed.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    AppointmentsComponent,
    LoadingComponent,
    VacantBedComponent,
    MyBedComponent,
    AllTestComponent,
    DiagCenterComponent,
    ViewAllAppointmentComponent,
    ViewMyAppointmentComponent,
    MakeAppointmentComponent,
    TestResultComponent,
    ViewBedComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers : [
    LoadingService
    ,
    AppointmentService,
    PatientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class PatientModule { }
