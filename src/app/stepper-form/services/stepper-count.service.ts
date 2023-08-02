import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StepperCountService {
  private _activeCount: Subject<number>;
  private _errorsOnTab: Subject<number>;
  private _emitSubmitClick: Subject<any>;
  public activeCount$: Observable<number>
  public errorTab$: Observable<number>
  public submitClick$: Observable<any>

  constructor() {
    this._activeCount = new Subject<number>();
    this.activeCount$ = new Observable<number>();
    this.activeCount$ = this._activeCount.asObservable()
    this._errorsOnTab = new Subject<number>()
    this.errorTab$ = this._errorsOnTab.asObservable()
    this._emitSubmitClick = new Subject<any>()
    this.submitClick$ = this._emitSubmitClick.asObservable()
  }
  /**
   * @description this method next subject with active tab number
   */
  setActiveTab(tabNumber: number): void {
    this._activeCount.next(tabNumber)
  }
  setErrorOnTab(tabNumber: number): void {
    this._errorsOnTab.next(tabNumber)
  }
  submitFormByTab(tab: number) {
    this._emitSubmitClick.next(tab)
  }
}
