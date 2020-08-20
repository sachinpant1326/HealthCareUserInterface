import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-add-bed',
  templateUrl: './add-bed.component.html',
  styleUrls: ['./add-bed.component.css']
})
export class AddBedComponent implements OnInit,OnDestroy{

  radioValue : string = 'general';
  routeSubscription : Subscription;
  constructor(private route : ActivatedRoute, private loader : LoadingService
    ) 
  { 

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(
      params => {
        this.radioValue = params['type'] || 'general';
      }
      );
    }
  onSelectChange(value) {
    this.radioValue = value;
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
    this.loader.show();
  }
}
