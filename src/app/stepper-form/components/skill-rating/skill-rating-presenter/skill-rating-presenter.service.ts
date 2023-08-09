import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SkillDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { SkillsData } from 'src/app/stepper-form/model/index.model';

@Injectable()
export class SkillRatingPresenterService {

  constructor(private _fb: FormBuilder) {

  }
  /**
   * initialize form group
   * @returns form group instance
   */
  public skillFormGroup(): FormGroup {
    return this._fb.group({
      selectedFramewrok: [],
      selectedLanguage: [],
      framework: this._fb.group({

      }, {
        validator: this.customValidators() // Adding the custom validator here
      }),
      programmingLanguges: this._fb.group({}, {
        validator: this.customValidators() // Adding the custom validator here
      }),
      leaderShipSkill: [, [Validators.required, Validators.min(2)]],
    })
  }

  /**
   * Add input range control in nested form group
   * @param form instance of main form group
   * @param name name of control
   * @param groupName name of nested group where control is append
   */
  public addControlToNestedGroup(form: FormGroup<any>, name: string, groupName: string) {
    const nestedGroup = form.get(`${groupName}`) as FormGroup;
    nestedGroup.addControl(`${name}`, new FormControl(null, [Validators.required, Validators.min(2)]));
  }

  /**
   * Remove control from nested form group
   * @param form instance of main form group
   * @param controlName control name
   * @param groupName nested form group name where control is remove
   */
  public removeControlFromNestedGroup(form: FormGroup<any>, controlName: string, groupName: string) {
    const nestedGroup = form.get(`${groupName}`) as FormGroup;
    nestedGroup.removeControl(`${controlName}`)
  }
  /**
   * custome required validator for nested form group
   * @returns validator function 
   */
  public customValidators(): ValidatorFn {
    let validateFun = (fg: FormGroup): ValidationErrors => {
      if (!Object.keys(fg.controls).length) {
        return { required: true }
      }
      return {}
    };
    return validateFun as ValidatorFn;
  }
  /**
   * save form data to local storage
   * @param value form data
   */
  public submitForm(value: SkillsData) {
    localStorage.setItem(SkillDetails, JSON.stringify(value))
  }

  /**
   * add contorls in nested form group before patch value
   * @param formGroup instance of form group where control will add
   * @param controls control name
   */
  addControls(formGroup: FormGroup, controls: string) {
    Object.keys(controls).forEach((item: string) => {
      formGroup.addControl(`${item}`, this._fb.control(null, [Validators.required, Validators.min(2)]))
    })
  }
}
