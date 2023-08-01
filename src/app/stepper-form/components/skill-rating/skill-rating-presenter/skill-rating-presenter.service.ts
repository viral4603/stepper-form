import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable()
export class SkillRatingPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  skillFormGroup() {
    return this._fb.group({
      framework: this._fb.group({}, {
        validator: this.customValidators() // Adding the custom validator here
      }),
      programmingLanguges: this._fb.group({}, {
        validator: this.customValidators() // Adding the custom validator here
      }),
      leaderShipSkill: [, Validators.required]
    })
  }

  /**
   * @description This method add controls in fromGroup while user select fields
   */
  addControlToNestedGroup(myForm: any, name: string, nestedGroupName: string) {
    const nestedGroup = myForm.get(`${nestedGroupName}`) as FormGroup;
    nestedGroup.addControl(`${name}`, new FormControl(null, Validators.required));
  }

  /**
   *@description This method is remove control from nested gruop while user remove fields 
  ***/
  removeControlFromNestedGroup(form: any, controlName: string, nestedGroupName: string) {
    const nestedGroup = form.get(`${nestedGroupName}`) as FormGroup;
    nestedGroup.removeControl(`${controlName}`)
  }
  /**
   * @description Add custom error to nested formGroup
   */
  customValidators(): ValidatorFn {
    let validateFun = (fg: FormGroup): ValidationErrors => {
      if (!Object.keys(fg.controls).length) {
        return { required: true }
      }
      return {}
    };
    return validateFun as ValidatorFn;
  }
  
}
