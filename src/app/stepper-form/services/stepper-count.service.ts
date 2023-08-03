import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StepperCountService {
  private _activeCount: Subject<number>;
  private _isLastStepReached: Subject<boolean>;
  private _emitSubmitClick: Subject<any>;
  public activeCount$: Observable<number>
  public lastStepReached$: Observable<boolean>
  public submitClick$: Observable<any>

  constructor() {
    this._activeCount = new Subject<number>();
    this.activeCount$ = new Observable<number>();
    this.activeCount$ = this._activeCount.asObservable()
    this._isLastStepReached = new Subject<boolean>()
    this.lastStepReached$ = this._isLastStepReached.asObservable()
    this._emitSubmitClick = new Subject<any>()
    this.submitClick$ = this._emitSubmitClick.asObservable()
  }
  /**
   * @description this method next subject with active tab number
   */
  setActiveTab(tabNumber: number): void {
    this._activeCount.next(tabNumber)
  }
  setLastStepReached(value: boolean): void {
    this._isLastStepReached.next(value)
  }
  submitFormByTab(navigationOption: any) {
    this._emitSubmitClick.next(navigationOption)
  }
}
