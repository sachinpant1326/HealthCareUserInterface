import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';


@NgModule({
  declarations: [LoginComponent, SignUpComponent, LoadingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  providers  : [
    UserService,
    LoadingService
  ]
})
export class UserModule { }
