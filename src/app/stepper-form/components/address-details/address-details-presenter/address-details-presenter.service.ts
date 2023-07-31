import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressDetails } from 'src/app/stepper-form/model/index.model';

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
   * submit form value to parent presentaion
   * @param formValues 
   */
  submitForm(formValues: AddressDetails) {
    console.log(formValues)
  }
}
