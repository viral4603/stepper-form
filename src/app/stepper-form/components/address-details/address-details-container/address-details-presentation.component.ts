import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AddressDetailsPresenterService } from '../address-details-presenter/address-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-address-details-presentation',
  templateUrl: './address-details-presentation.component.html',
  styleUrls: ['./address-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AddressDetailsPresenterService
  ]
})
export class AddressDetailsPresentationComponent implements OnInit, OnDestroy {
  public addressForm: FormGroup;
  public isFormValid: boolean;
  public unSubscribe: Subject<any>
  public cars: {
    id: number,
    name: string
  }[] = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
    ];

  constructor(
    private _addressPresenterService: AddressDetailsPresenterService,
    private _stepperCountService: StepperCountService,
    private _cdr: ChangeDetectorRef) {
    this.addressForm = this._addressPresenterService.basicDeatilsFormGroup();
    this.isFormValid = true;
    this.unSubscribe = new Subject<any>();
  }
  ngOnInit(): void {
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 2) {
        this.submitForm(res.navigateTo)
      }
    })
    //patch form Value
    const localStorageValue = localStorage.getItem('addressDetails')
    if (localStorageValue) {
      this.addressForm.patchValue(JSON.parse(localStorageValue))
    }
  }
  //get all form control in a form group
  public get formContorls() {
    return this.addressForm.controls
  }
  /**
   * @description submit form data and neavigate to next tab
   * @param tab next tab value
   */
  public submitForm(tab: number) {
    if (this.addressForm.status !== "INVALID") {
      this._addressPresenterService.submitForm(this.addressForm.value)
      this.navigateToTab(tab)
    }
    else {
      this.isFormValid = false;
      this._cdr.markForCheck()
    }
  }
  /**
   * @description navigate user to tab and store changed value 
   * @param tab number of tab where user want to navigate
   */
  navigateToTab(tab: number): void {
    this._stepperCountService.setActiveTab(tab);
    this._addressPresenterService.submitForm(this.addressForm.value)
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
