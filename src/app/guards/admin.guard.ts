import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private jwtHelperService: JwtHelperService, private router : Router) {

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('token');
    let isExpired = this.jwtHelperService.isTokenExpired(token);
    if (token && !isExpired) {
      let isAdmin = this.jwtHelperService.decodeToken(token)['jti'] === 'ROLE_ADMIN';
      if (isAdmin) {
        return true;
      }
    }
    this.router.navigate(['user', 'login']);
    return false;
  }
}
