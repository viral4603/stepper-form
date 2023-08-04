import { ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { BasicDetailsPresenterService } from '../basic-details-presenter/basic-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-basic-details-presentation',
  templateUrl: './basic-details-presentation.component.html',
  styleUrls: ['./basic-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BasicDetailsPresenterService
  ],
})
export class BasicDetailsPresentationComponent implements OnInit, OnDestroy {
  public basicDetails: FormGroup;
  public isFormValid: boolean;
  public unSubscribe: Subject<any>

  constructor(private _presenterService: BasicDetailsPresenterService, private _stepperCountService: StepperCountService,
    private _cdr: ChangeDetectorRef) {
    this.basicDetails = this._presenterService.basicDeatilsFormGroup();
    this.isFormValid = true;
    this.unSubscribe = new Subject<any>();
  }


  //get forms all controls
  get formContorls() {
    return this.basicDetails.controls
  }
  ngOnInit(): void {
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 1) {
        this.submitForm(res.navigateTo)
      }
    })
    //patch form Value
    const localStorageValue = localStorage.getItem('basicDetails')
    if (localStorageValue) {
      this.basicDetails.patchValue(JSON.parse(localStorageValue))
    }
  }
  /**
   * @description this method submit from data to container
   */
  submitForm(tab: number): void {
    if (this.basicDetails.status !== "INVALID") {
      this._presenterService.submitForm(this.basicDetails.value)
      this._stepperCountService.setActiveTab(tab)
    }
    else {
      this.isFormValid = false;
      this._cdr.markForCheck()
    }
  }
  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
