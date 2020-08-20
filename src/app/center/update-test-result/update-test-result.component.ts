import { Component, OnInit } from '@angular/core';
import { UpdateResultService } from '../services/update-result.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-test-result',
  templateUrl: './update-test-result.component.html',
  styleUrls: ['./update-test-result.component.css']
})
export class UpdateTestResultComponent implements OnInit {
  
 

  constructor(private updateResultService:UpdateResultService, private formBuilder : FormBuilder,
    private loader : LoadingService,
    private toastr : ToastrService
    ) { }

  updateResultForm:FormGroup;
  conditionType:string[];
  msg: string;
  errorMsg: string;

  ngOnInit(): void {
    this.loader.hide();
    this.conditionType=['Below Normal','Normal','Above Normal'];
    console.log(this.conditionType);
    this.updateResultForm = this.formBuilder.group({
      appointmentId : [0, Validators.compose([Validators.required, Validators.pattern("[1-9][0-9]+")])],
      condition     : ['', Validators.compose([Validators.required])],
      testReading   : [0,Validators.compose([Validators.required,Validators.pattern("[1-9][0-9]+")])]

    });
  }

  addTestResult(){
    if(this.updateResultForm.invalid){
      this.toastr.error('Invalid Form Values entered', 'Test Result Form');
      return;
    }
    this.loader.show();
    this.updateResultService.addTestResult(this.updateResultForm.controls.appointmentId.value,
        this.updateResultForm.controls.condition.value,
        this.updateResultForm.controls.testReading.value
      ).subscribe(data=>{
        this.toastr.success(data['message'], data['header']);
    },(error : HttpErrorResponse)=>{
      this.toastr.error(error.error['message'], error.error['header']);
    });
      
  }

}
