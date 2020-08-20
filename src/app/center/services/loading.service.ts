import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {

  private loader = new BehaviorSubject<boolean>(true);
  private state = this.loader.asObservable();
  constructor() { }

  show() {
    this.loader.next(<boolean>true);
  }
  hide() {
    this.loader.next(<boolean>false);
  }

  getState() {
    return this.state;
  }

}
