import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  showLoad : boolean = false;
  loadSubscription : Subscription;
  constructor(
    private loaderService : LoadingService
  ) { }

  ngOnInit(): void {
    this.loadSubscription = this.loaderService.getState().subscribe(status => {
      this.showLoad = status;
    });
  }

  ngOnDestroy() {
    this.loadSubscription.unsubscribe();
  }

}
