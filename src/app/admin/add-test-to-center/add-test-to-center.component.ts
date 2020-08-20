import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticCenter } from '../models/DiagnosticCenter';
import { DiagnosticTest } from '../models/DiagnosticTest';
import { ConditionalExpr } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-test-to-center',
  templateUrl: './add-test-to-center.component.html',
  styleUrls: ['./add-test-to-center.component.css']
})
export class AddTestToCenterComponent implements OnInit {

  diagnosticCenterId:number;
  addTestForm:FormGroup;
  diagnosticTestOfCenter:DiagnosticTest[];
  diagnosticCenter:DiagnosticCenter;
  allDiagnosticTest:DiagnosticTest[];
  submitted:boolean=false;
  isTestSelected:boolean=false;
  selectedTest:DiagnosticTest;
  constructor(private adminService:AdminService,private route:ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.diagnosticCenterId = params['id'];
    })
    console.log(this.diagnosticCenterId);
    this.addTestForm=this.formBuilder.group({
      selectTest:['',Validators.required]
    });
    this.adminService.getDiagnosticCenterById(this.diagnosticCenterId).subscribe(data=>{
      this.diagnosticCenter=data;
      console.log(this.diagnosticCenter);
    },err=>{
      console.log(err.stack);
    })

    this.adminService.getTestsOfADiagnosticCenter(this.diagnosticCenterId).subscribe(data=>{
      this.diagnosticTestOfCenter=data;
      console.log(this.diagnosticTestOfCenter);
    },err=>{
      console.log(err.stack);
    })

    this.adminService.getAllTests().subscribe(data=>{
      this.allDiagnosticTest=data;
      
      console.log(this.allDiagnosticTest);
    },err=>{
      console.log(err.stack);
    })
  }
  changeTest(e) {
    console.log(e.target.value)
    this.addTestForm.controls.selectTest.setValue(e.target.value, {
      onlySelf: true
    })
    for(let i=0;i<this.allDiagnosticTest.length;i++){
      if(this.allDiagnosticTest[i].id==this.addTestForm.controls.selectTest.value){
        this.selectedTest=this.allDiagnosticTest[i];
        break;
      }
    }
    console.log(this.selectedTest);
    this.isTestSelected=true;
  }
  addTestToDC(){
    this.submitted=true;
    if(this.addTestForm.invalid){
      return;
    }
    if(confirm("Do you want to add Test....")){
      this.adminService.addTestToCenter(this.selectedTest,this.diagnosticCenterId).subscribe(data=>{
        this.diagnosticTestOfCenter=data;
      },err=>{
        console.log(err.stack);
        alert(err.error.message);
        
      })
    }
    
  }
  
}
