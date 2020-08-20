import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VacantBedsServiceService {

  constructor(private http:HttpClient) { }

  public getVacantBedsList(){
    return this.http.get('http://localhost:8090/api/admin/vacantbeds');
  }
}
