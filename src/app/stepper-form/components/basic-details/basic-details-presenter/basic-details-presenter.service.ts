import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { BasicData } from 'src/app/stepper-form/model/index.model';

@Injectable()
export class BasicDetailsPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  /**
   * @description initialise basic deatils form group
   */
  public basicDeatilsFormGroup() {
    return this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required]
    })
  }
  /** save form data to local storage*/
  public submitForm(formValues: BasicData) {
    localStorage.setItem(BasicDetails, JSON.stringify(formValues))
  }



}
