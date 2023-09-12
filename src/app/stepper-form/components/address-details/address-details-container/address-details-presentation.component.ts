import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AddressDetailsPresenterService } from '../address-details-presenter/address-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SelectOption } from 'src/app/stepper-form/model/index.model';
import { AddressDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { StepperForm } from 'src/app/shared/custom-stepper/model';

@Component({
  selector: 'app-address-details-presentation',
  templateUrl: './address-details-presentation.component.html',
  styleUrls: ['./address-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AddressDetailsPresenterService
  ]
})
export class AddressDetailsPresentationComponent implements OnInit, OnDestroy, StepperForm {
  /** input and setter for country with state list */
  @Input() public set countryAndState(value: any[]) {
    if (value) {
      this._countryAndState = value;
      this.country = this.addressPresenterService.getAllCountry(this.countryAndState)
    }
  }
  /** getter for country and state */
  public get countryAndState(): any[] {
    return this._countryAndState;
  }
  /** input and setter fot country with state list */
  @Input() public set countryAndCity(value: any[]) {
    this._countryAndCity = value;
  }
  /** getter for country and city  */
  public get countryAndCity(): any[] {
    return this._countryAndCity;
  }
  /** form instance of address form */
  public addressForm: FormGroup;
  /** validation flag when user submit form */
  public isFormValid: boolean;
  /** subject for unsubscribe observale */
  public unSubscribe: Subject<void>
  /** country list for ng select options */
  public country: SelectOption[];
  /** state list for ng select options */
  public state: SelectOption[];
  /** city list for ng select options */
  public cities: SelectOption[]

  /** county with state */
  private _countryAndState: any[];
  /** county with city */
  private _countryAndCity: any[];

  /** get form controls for valditation */
  public get formContorls() {
    return this.addressForm.controls
  }
  /** valid state for from */
  public isValid: boolean;
  constructor(
    private addressPresenterService: AddressDetailsPresenterService,
    private stepperCountService: StepperCountService,
    private cdr: ChangeDetectorRef) {
    this.addressForm = this.addressPresenterService.basicDeatilsFormGroup();
    this.isFormValid = true;
    this.unSubscribe = new Subject<void>();
    this._countryAndState = [];
    this._countryAndCity = [];
    this.country = [];
    this.state = [];
    this.cities = [];
    this.isValid = true;
  }



  ngOnInit(): void {
    /**patch form value from local storage */
    const localStorageValue = localStorage.getItem(AddressDetails)
    if (localStorageValue) {
      const formValue = JSON.parse(localStorageValue)
      this.state = this.addressPresenterService.getStateFromCountry(this.countryAndState, formValue.country)
      this.cities = this.addressPresenterService.getCitiesFromCountry(this.countryAndCity, formValue.country)
      this.addressForm.patchValue(formValue)
    }
  }

  /**
   * @description submit form data and neavigate to next tab
   * @param tab next tab value
   */
  public submitForm() {
    if (this.addressForm.status !== "INVALID") {
      this.addressPresenterService.submitForm(this.addressForm.value)
    }
    else {
      this.isValid = false;
      this.cdr.markForCheck()
    }
  }

  /**
   * @description Provide list of state based on slected country
   * @param value country name
   */
  public onSelectCountry(value: string) {
    if (value) {
      this.addressForm.controls['state'].reset()
      this.addressForm.controls['city'].reset()
      this.state = this.addressPresenterService.getStateFromCountry(this.countryAndState, value)
      this.cities = this.addressPresenterService.getCitiesFromCountry(this.countryAndCity, value)
    }
  }
  /** get form group for parent access */
  getFormData(): FormGroup<any> {
    return this.addressForm
  }

  ngOnDestroy(): void {
    this.unSubscribe.next()
    this.unSubscribe.unsubscribe()
  }
}
