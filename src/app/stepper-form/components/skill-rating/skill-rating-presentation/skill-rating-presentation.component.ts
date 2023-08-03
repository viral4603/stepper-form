import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SkillRatingPresenterService } from '../skill-rating-presenter/skill-rating-presenter.service';
import { Subject } from 'rxjs/internal/Subject';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-skill-rating-presentation',
  templateUrl: './skill-rating-presentation.component.html',
  styleUrls: ['./skill-rating-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkillRatingPresenterService]
})
export class SkillRatingPresentationComponent implements OnInit, OnDestroy {

  public skillForm: FormGroup;
  public isFormValid: boolean;
  public unSubscribe: Subject<any>;
  public cars: any = [
    { id: 1, name: 'Volvo', selected: true },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor(private _skillPresenterService: SkillRatingPresenterService, private _cdr: ChangeDetectorRef,
    private _stepperCountService: StepperCountService) {
    this.skillForm = this._skillPresenterService.skillFormGroup()
    this.isFormValid = true;
    this.unSubscribe = new Subject<any>();
  }

  public get formContorls() {
    return this.skillForm.controls;
  }

  public get frameWorksContorls() {
    const skillGroup = this.skillForm.controls['framework'] as FormGroup
    return skillGroup['controls']
  }

  ngOnInit(): void {
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 3) {
        this.submitForm(res.navigateTo)
      }
    })
    //patch form value
    const localStorageValue = JSON.parse(localStorage.getItem('skillDetails')!)
    if (localStorageValue) {
      for (let item in localStorageValue) {
        if (typeof localStorageValue[`${item}`] === 'object') {
          const nestedGroup = this.skillForm.controls[`${item}`] as FormGroup
          this._skillPresenterService.addControls(nestedGroup, localStorageValue[`${item}`])
        }
      }
      this.skillForm.patchValue(localStorageValue)
    }
  }

  /**
   * @description Add range control in the form group
   * @param controlName Name of the control
   * @param parentGroup Name of fromgroup where control should add.
   */
  onSelectChange(controlName: string, parentGroup: string) {
    if (controlName) {
      this._skillPresenterService.addControlToNestedGroup(this.skillForm, controlName, parentGroup)
    }
  }
  /**
   * @description Remove range control from the Group 
   * @param object Object of event
   * @param parentGroup Name of fromgroup from where control will remove.
   */
  onDeselectChange(object: any, parentGroup: string) {
    this._skillPresenterService.removeControlFromNestedGroup(this.skillForm, object.value, parentGroup)
  }
  /**
   * get all conrols of Framework from group
   */
  get frameWorkGroupControls() {
    const resultArray = []
    const nestedGroup = this.skillForm.get('framework') as FormGroup
    for (let key in nestedGroup.controls) {
      resultArray.push(key)
    }
    return resultArray
  }
  /**
  * get all conrols of Programming from group
  */
  get programmingGroupControls() {
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
  submitForm(tab: number): void {
    if (this.skillForm.status !== "INVALID") {
      this._skillPresenterService.submitForm(this.skillForm.value)
      this.navigateTab(tab)
    }
    else {
      this.isFormValid = false;
      this._cdr.markForCheck()
    }
  }

  /**
   * @description change state of nested form group to touched
   * @param name nested form group name
   */
  markFormGroupAsTouched(name: string) {
    this.skillForm.controls[`${name}`].markAsTouched()
  }

  /**
   * @description navigation
   */
  public navigateTab(tab: number) {
    this._stepperCountService.setActiveTab(tab)
  }

  //unsubscribe all subscriber
  public ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
