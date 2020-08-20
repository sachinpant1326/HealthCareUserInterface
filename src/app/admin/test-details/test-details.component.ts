import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { DiagnosticTest } from '../models/DiagnosticTest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  editForm:FormGroup;
  addTestForm:FormGroup;
  tests:DiagnosticTest[];
  flag:boolean=false;
  submitted:boolean=false;
  addTestFormSubmitted:boolean=false;
  addTest:boolean=false;
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      id:['',Validators.required],
      testName:['',Validators.required],
      testPrice:['',Validators.required],
      normalValue:['',Validators.required],
      units:['',Validators.required]
    })
    this.addTestForm=this.formBuilder.group({
      id:['',Validators.required],
      testName:['',Validators.required],
      testPrice:['',Validators.required],
      normalValue:['',Validators.required],
      units:['',Validators.required]
    })
    this.adminService.getAllTests().subscribe(
      data=>{
        this.tests=data;
        console.log(this.tests);
      },err=>{
        console.log(err.stack);
      }
    );

  }
  editTest(i:number){
  this.flag=true;
  this.editForm.setValue(this.tests[i]);
  }

  editTestDetails(){
    this.submitted=true;
    if(this.editForm.invalid){
      return;
    }
    this.adminService.updateTestDetails(this.editForm.value).subscribe(data=>{
      this.flag=false;
    },err=>{
      console.log(err.stack);
    })
  }
  addNewTest(){
    this.addTest=true;
  }
  persistTest(){
    console.log("add test");
    this.addTestFormSubmitted=true;
    console.log("add test");
    this.adminService.addNewTest(this.addTestForm.value).subscribe(data=>{
      if(confirm("test is added successfully...")){
        this.adminService.getAllTests().subscribe(
          data=>{
            this.tests=data;
            console.log(this.tests);
          },err=>{
            console.log(err.stack);
          }
        );
        this.addTest=false;
      }
    },err=>{
      console.log(err.stack);
    })
  }
 

}
