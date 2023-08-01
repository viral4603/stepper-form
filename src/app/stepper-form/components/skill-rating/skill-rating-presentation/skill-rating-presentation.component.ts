import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SkillRatingPresenterService } from '../skill-rating-presenter/skill-rating-presenter.service';

@Component({
  selector: 'app-skill-rating-presentation',
  templateUrl: './skill-rating-presentation.component.html',
  styleUrls: ['./skill-rating-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkillRatingPresenterService]
})
export class SkillRatingPresentationComponent {
  @Output() public submitFormData: EventEmitter<any>;
  public skillForm: FormGroup;
  public isFormValid: boolean;
  constructor(private _skillPresenterService: SkillRatingPresenterService, private _cdr: ChangeDetectorRef) {
    this.skillForm = this._skillPresenterService.skillFormGroup()
    this.submitFormData = new EventEmitter<any>();
    this.isFormValid = true;
  }
  
  public cars: any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  public get formContorls() {
    return this.skillForm.controls;
  }

  public get frameWorksContorls() {
    const skillGroup = this.skillForm.controls['framework'] as FormGroup
    return skillGroup['controls']
  }

  onSelectChange(value: string, parentGroup: string) {
    if (value) {
      this._skillPresenterService.addControlToNestedGroup(this.skillForm, value, parentGroup)
    }
  }

  onDeselectChange(object: any, parentGroup: string) {
    this._skillPresenterService.removeControlFromNestedGroup(this.skillForm, object.value, parentGroup)
  }

  get nestedGroupArray() {
    const resultArray = []
    const nestedGroup = this.skillForm.get('framework') as FormGroup
    for (let key in nestedGroup.controls) {
      resultArray.push(key)
    }
    return resultArray
  }
  get nestedGroupOfProgramming() {
    const resultArray = []
    const nestedGroup = this.skillForm.get('programmingLanguges') as FormGroup
    for (let key in nestedGroup.controls) {
      resultArray.push(key)
    }
    return resultArray
  }

  /**
 * @description this method submit from data to container
 */
  submitForm(): void {
    if (this.skillForm.status !== "INVALID") {
      this.submitFormData.emit({ data: this.skillForm.value, activeTab: 4 })
    }
    else {
      this.isFormValid = false;
    }
  }
  /**
   * @description change state of nested form group to touched
   * @param name nested form group name
   */
  markFormGroupAsTouched(name:string) {
     this.skillForm.controls[`${name}`].markAsTouched()
  }

}
