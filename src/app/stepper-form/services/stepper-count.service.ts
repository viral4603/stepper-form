import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StepperCountService {
  private _activeCount: Subject<number>;
  public activeCount$: Observable<number>

  constructor() {
    this._activeCount = new Subject<number>();
    this.activeCount$ = new Observable<number>();
    this.activeCount$ = this._activeCount.asObservable()
  }
  /**
   * @description this method next subject with active tab number
   */
  setActiveTab(tabNumber: number): void {
    this._activeCount.next(tabNumber)
  }

}
