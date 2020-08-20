import { Component, OnInit, OnDestroy, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentChecked {

  showLoad : boolean = true;
  loadSubscription : Subscription;
  constructor(
    private loaderService : LoadingService,
    private cdr : ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    this.loadSubscription = this.loaderService.getState().subscribe(status => {
      this.showLoad = status;
    });
  }

  ngAfterContentChecked(){
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.loadSubscription.unsubscribe();
  }

  logOut(){
    localStorage.removeItem('token');
  }
}
