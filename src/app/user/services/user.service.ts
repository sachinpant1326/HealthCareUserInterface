import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class UserService {

  baseurl : string  = 'http://localhost:8090/api/public/';
  constructor(private http: HttpClient, private loader: LoadingService) { }

  login( username : string, password : string ) {
    return this.http.post(this.baseurl + 'authenticate', { username, password }).pipe(finalize(() => { this.loader.hide(); }));
  }

  registerPatient(patient : any) {
    return this.http.post(`${this.baseurl}registerPatient`, patient).pipe(finalize(() => { this.loader.hide(); }));
  }

}
