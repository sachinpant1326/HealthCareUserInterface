import { Component, OnInit } from '@angular/core';
import { VacantBedsServiceService } from '../services/vacant-beds-service.service';

@Component({
  selector: 'app-vacant-beds',
  templateUrl: './vacant-beds.component.html',
  styleUrls: ['./vacant-beds.component.css']
})
export class VacantBedsComponent implements OnInit {

  
  constructor(private service:VacantBedsServiceService) { }

  beds:any = [];
  msg:string;
  errorMsg:string;
  ngOnInit() : void{
    this.getlist();
  }

  getlist(){
   
    this.service.getVacantBedsList().subscribe(data=>{     
       this.beds=data;
      this.errorMsg=undefined;},error=>{
        this.errorMsg=error.error.message;
     });
  }
}
