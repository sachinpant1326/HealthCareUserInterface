import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { DiagnosticTest } from 'src/app/patient/models/DiagnosticTest';
import { PatientService } from '../services/patient.service';
import { TestResult } from '../models/test-result.model';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-test',
  templateUrl: './all-test.component.html',
  styleUrls: ['./all-test.component.css']
})
export class AllTestComponent implements OnInit {

  
  tests:DiagnosticTest;
  testResult:TestResult;
  flag:boolean=false;
  constructor(private patientService:PatientService, private toastService : ToastrService,
    private loaderService : LoadingService, private router:Router) { }

  ngOnInit(): void {
    
    this.patientService.getAllTest().subscribe(data=>{
      this.tests=data;
      console.log(this.tests);
    }, err=>{
      console.log(err.stack)
    })
  }

  viewTestResult(testId:number){
    
    this.patientService.setId(testId);
  }

}
