import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { DiagnosticCenter } from '../models/DiagnosticCenter';
import { Router, ActivatedRoute } from '@angular/router';
import { DiagnosticTest } from '../models/DiagnosticTest';

@Component({
  selector: 'app-remove-test-from-center',
  templateUrl: './remove-test-from-center.component.html',
  styleUrls: ['./remove-test-from-center.component.css']
})
export class RemoveTestFromCenterComponent implements OnInit {

  diagnosticCenterId:number;
  diagnosticCenter:DiagnosticCenter;
  diagnosticTestOfCenter:DiagnosticTest[];
  isTestAvailable:boolean=true;
  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.diagnosticCenterId = params['id'];
    })
    console.log(this.diagnosticCenterId);
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
    
  }
  removeTest(i:number){
    if(confirm("you want to remove "+this.diagnosticTestOfCenter[i].testName+" from "+this.diagnosticCenter.name)){
      this.adminService.removeTestFromCenter(this.diagnosticTestOfCenter[i],this.diagnosticCenterId).subscribe(data=>{
        this.diagnosticTestOfCenter=data;
      },err=>{
        console.log(err.stack);
      })
    }
    
  }

}
