import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { AddressData, SelectOption } from 'src/app/stepper-form/model/index.model';

@Injectable()
export class AddressDetailsPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  /**
   * @description initialise basic deatils form group
   */
  basicDeatilsFormGroup() {
    return this._fb.group({
      address: ['', Validators.required],
      streetAddress: ['', Validators.required],
      pinCode: ['', Validators.required],
      country: [, Validators.required],
      state: [, Validators.required],
      city: [, Validators.required]
    })
  }
  /**
   * get conytry list 
   */
  public getAllCountry(stateAndcountry: any[]): SelectOption[] {
    return stateAndcountry.map((item: any, i: number) => {
      return { id: i, name: item.name }
    })
  }
  /**
   *  get all state of the selected country 
   */
  getStateFromCountry(stateAndcountry: any[], countryName: string): SelectOption[] {
    const state = stateAndcountry.filter((item: any) => item.name === countryName)[0].states
    return state.map((item: any, i: number) => { return { id: i, name: item.name } })
  }
  /**
   * get all cities from country
   */
  getCitiesFromCountry(cityAndCountry: any[], countryName: string): SelectOption[] {
    const countryData = cityAndCountry.filter((item: any) => item.country === countryName)[0].cities
    return countryData.map((city: string, i: number) => { return { id: i, name: city } })
  }
  /**
   * submit form value to parent presentaion
   * @param formValues 
   */
  submitForm(formValues: AddressData) {
    localStorage.setItem(AddressDetails, JSON.stringify(formValues))
  }
}
