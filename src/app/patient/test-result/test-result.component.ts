import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { TestResult } from '../models/test-result.model';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  testResult:TestResult;
  constructor(private patientService:PatientService,
              private toastService:ToastrService) { }

  ngOnInit(): void {
  
       this.patientService.viewTestResultById(this.patientService.getId()).subscribe(data=>{
      this.testResult=data;
      
      console.log(this.testResult);
    },err=>{
      console.log(err.stack);
      this.toastService.error("Test Result Awaited !!")
    })
  }

}
