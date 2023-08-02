import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class ProjectDetailsPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  /**
   * Initialize form group
   * @returns formGroup
   */
  buildProjectDetailsForm() {
    return this._fb.group({
      projectName: [, Validators.required],
      roll: [, Validators.required],
      startDate: [, Validators.required],
      endDate: [, Validators.required],
      system: [, Validators.required],
      mouse: [, Validators.required],
      keyboard: [, Validators.required]
    })
  }
  /**
   * @description submit form data
   */
  submitForm(value:any) {
    localStorage.setItem('projectDetails',JSON.stringify(value))
  }



}
