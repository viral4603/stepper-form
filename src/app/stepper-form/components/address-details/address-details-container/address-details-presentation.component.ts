import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AddressDetailsPresenterService } from '../address-details-presenter/address-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SelectOption } from 'src/app/stepper-form/model/index.model';

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
  //set country list
  @Input() public set countryAndState(v: any[]) {
    this._countryAndState = v;
  }
  //get countryAndState list for select options
  public get countryAndState(): any[] {
    return this._countryAndState;
  }
  //get stateList
  private _countryAndCity: SelectOption[];
  public get countryAndCity(): SelectOption[] {
    return this._countryAndCity;
  }
  @Input() public set countryAndCity(v: SelectOption[]) {
    this._countryAndCity = v;
  }

  private _countryAndState: any[];
  public addressForm: FormGroup;
  public isFormValid: boolean;
  public unSubscribe: Subject<any>
  public country: SelectOption[];
  public state: SelectOption[];
  public cities: SelectOption[]

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
    this._countryAndState = [];
    this._countryAndCity = [];
    this.country = [];
    this.state = [];
    this.cities = [];

  }
  ngOnInit(): void {
    //set coutry list in select option 
    this.country = this._addressPresenterService.getAllCountry(this.countryAndState)
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 2) {
        this.submitForm(res.navigateTo)
      }
    })
    //patch form Value
    const localStorageValue = localStorage.getItem('addressDetails')
    if (localStorageValue) {
      const formValue = JSON.parse(localStorageValue)
      this.state = this._addressPresenterService.getStateFromCountry(this.countryAndState, formValue.country)
      this.cities = this._addressPresenterService.getCitiesFromCountry(this.countryAndCity, formValue.country)
      this.addressForm.patchValue(formValue)
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
  /**
   * @description Provide list of state based on slected country
   * @param value 
   */
  onSelectCountry(value: string) {
    if (value) {
      this.addressForm.controls['state'].reset()
      this.addressForm.controls['city'].reset()
      this.state = this._addressPresenterService.getStateFromCountry(this.countryAndState, value)
      this.cities = this._addressPresenterService.getCitiesFromCountry(this.countryAndCity, value)
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
