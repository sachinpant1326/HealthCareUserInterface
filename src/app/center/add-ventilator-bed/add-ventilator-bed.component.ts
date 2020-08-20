import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CenterService } from '../services/center.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ventilator-bed',
  templateUrl: './add-ventilator-bed.component.html',
  styleUrls: ['./add-ventilator-bed.component.css']
})
export class AddVentilatorBedComponent implements OnInit, OnDestroy {

  ventilatorBedForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private loader: LoadingService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private centerService: CenterService
  ) { 
   
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader.hide();
    }, 2000);
    this.ventilatorBedForm = this.formBuilder.group({
      pricePerDay: ['', Validators.compose([Validators.required, Validators.min(2000), Validators.pattern("[0-9]+")])],
      noOfBeds: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("[0-9]+")])],
      respiratoryRate: ['', Validators.compose([Validators.required,Validators.min(10), Validators.max(15), Validators.pattern("[0-9]+")])],
      type: ['', Validators.compose([Validators.required, Validators.pattern("Time|Volume|Pressure")])],
    });
  }

  addVentilatorBed() {
    this.submitted = true;
    if (this.ventilatorBedForm.invalid) {
      this.toastr.error('Form Not Submitted as invalid data is entered or no data entered', 'Form Submission')
      return;
    }
    this.loader.show();
    this.centerService.addVentilatorBed(this.ventilatorBedForm.value).subscribe(data => {
      this.toastr.success(data['message'], data['header']);
      this.router.navigate(['center', 'all-beds']);
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.error['message'], err.error['header']);
    });
  }

  ngOnDestroy() {
    this.loader.show();
  }

}
