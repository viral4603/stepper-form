import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicDetails } from 'src/app/stepper-form/model/index.model';

@Injectable()
export class BasicDetailsPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  /**
   * @description initialise basic deatils form group
   */
  basicDeatilsFormGroup() {
    return this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required]
    })    
  }
  /**
     * 
     */
  submitForm(formValues:BasicDetails) {
    localStorage.setItem('basicDetails',JSON.stringify(formValues))  
  }
  


}
