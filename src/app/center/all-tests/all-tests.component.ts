import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-all-tests',
  templateUrl: './all-tests.component.html',
  styleUrls: ['./all-tests.component.css']
})
export class AllTestsComponent implements OnInit {

  constructor(
    private loader : LoadingService
  ) { }

  ngOnInit(): void {
    this.loader.hide();
  }

}
