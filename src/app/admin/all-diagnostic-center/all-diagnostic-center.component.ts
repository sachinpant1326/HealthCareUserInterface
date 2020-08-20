import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { DiagnosticCenter } from '../models/DiagnosticCenter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-diagnostic-center',
  templateUrl: './all-diagnostic-center.component.html',
  styleUrls: ['./all-diagnostic-center.component.css']
})
export class AllDiagnosticCenterComponent implements OnInit {

  diagnosticCenters:DiagnosticCenter[];
  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.adminService.getAllDiagnosticCenters().subscribe(data=>{
      this.diagnosticCenters=data;
      console.log(this.diagnosticCenters);
    },err=>{
      console.log(err.stack);
    })
  }

  addTestToDC(i:number){
    this.router.navigate(['admin/addTestToCenter',this.diagnosticCenters[i].id]);
  }
  removeTestFromDC(i:number){
    this.router.navigate(['admin/removeTestFromCenter',this.diagnosticCenters[i].id]);
  }

}
