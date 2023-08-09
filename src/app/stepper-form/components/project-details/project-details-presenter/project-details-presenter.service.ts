import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { ProjectData } from 'src/app/stepper-form/model/index.model';

@Injectable()
export class ProjectDetailsPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  /**
   * Initialize form group
   * @returns formGroup
   */
  public buildProjectDetailsForm(): FormGroup {
    return this._fb.group({
      projectName: [, Validators.required],
      role: [, Validators.required],
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
  public submitForm(value: ProjectData): void {
    localStorage.setItem(ProjectDetails, JSON.stringify(value))
  }



}
