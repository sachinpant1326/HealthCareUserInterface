import { Injectable } from '@angular/core';
import { CanLoad, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanLoad {

  constructor(private jwtHelperService: JwtHelperService, private router: Router) {
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('token');
    let isExpired = this.jwtHelperService.isTokenExpired(token);
    if (token && !isExpired) {
      let isPatient = this.jwtHelperService.decodeToken(token)['jti'] === 'ROLE_PATIENT';
      if (isPatient) {
        return true;
      }
    }
    this.router.navigate(['user', 'login']);
    return false;
  }
}
