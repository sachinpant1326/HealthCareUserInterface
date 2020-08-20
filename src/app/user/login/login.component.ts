import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  showLoad: boolean = false;
  loadSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private jwtService: JwtHelperService,
    private router: Router,
    private toastService : ToastrService,
    private loaderService : LoadingService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.loadSubscription = this.loaderService.getState().subscribe(status => {
      this.showLoad = status;
    });
  }

  ngOnDestroy(){
    this.loadSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loaderService.show();
    this.userService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(
        data => {
          this.toastService.success('Login Successful', "Authorization");
          localStorage.setItem('token', data['jwt']);
          let role = this.jwtService.decodeToken(data['jwt'])['jti'];
          if (role === 'ROLE_CENTER') {
            this.router.navigate(['center']);
          }
          else if (role === 'ROLE_ADMIN') {
            this.router.navigate(['admin']);
          }
          else if (role === 'ROLE_PATIENT') {
            this.router.navigate(['patient']);
          }
        },
        (err: HttpErrorResponse) => {
          this.toastService.error('The username or password does not match records', 'Authorization Exception');
        });
  }
}
