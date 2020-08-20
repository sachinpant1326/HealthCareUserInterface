import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  submitted: boolean = false;
  showLoad : boolean = false;
  loadSubscription : Subscription;
  constructor(private userService: UserService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private loader : LoadingService,
    private toastr : ToastrService
    ) { }

  ngOnInit(): void {
    this.loadSubscription = this.loader.getState().subscribe(show => this.showLoad = show);
    this.addUserForm = this.formBuilder.group({

      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[A-Za-z0-9!@#]{8,20}")]],
      name: ["", [Validators.required, Validators.pattern("[A-Za-z_ ]{7,20}")]],
      phoneNo: ["", [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      age : ['',[ Validators.required]],
      gender : ['', [Validators.required]]
    });
  
  }

  ngOnDestroy(){
    this.loadSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get formFields() {
    return this.addUserForm.controls;
  }

  addUser() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.toastr.info('Form Not Submitted Due to Invalid Data', 'Form Submission');
      return;
    }
    this.loader.show();
    this.userService.registerPatient(this.addUserForm.value).subscribe(
      (data) => {
        this.toastr.success(
          `Hello, ${this.addUserForm.controls.username.value}. Your have been registered successfully😊`, 
          'Form Submission'
        );
        this.router.navigate(['user','login']);
      },
      (error : HttpErrorResponse) => {
        this.toastr.error(error.error['message'], 'Exception'); }
    );
  }

}
