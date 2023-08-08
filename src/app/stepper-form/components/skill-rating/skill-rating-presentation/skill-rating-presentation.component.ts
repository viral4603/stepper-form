import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SelectOption } from 'src/app/stepper-form/model/index.model';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { SkillRatingPresenterService } from '../skill-rating-presenter/skill-rating-presenter.service';

@Component({
  selector: 'app-skill-rating-presentation',
  templateUrl: './skill-rating-presentation.component.html',
  styleUrls: ['./skill-rating-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkillRatingPresenterService]
})
export class SkillRatingPresentationComponent implements OnInit, OnDestroy {

  @Input() public set frameworks(v: SelectOption[]) {
    this._frameworks = v;
  }
  public get frameworks(): SelectOption[] {
    return this._frameworks;
  }

  @Input() public set programmingLanguages(v: SelectOption[]) {
    this._programmingLanguages = v;
  }
  public get programmingLanguages(): SelectOption[] {
    return this._programmingLanguages;
  }

  public skillForm: FormGroup;
  public isFormValid: boolean;
  public unSubscribe: Subject<any>;

  private _frameworks: SelectOption[];
  private _programmingLanguages: SelectOption[];

  public get formContorls() {
    return this.skillForm.controls;
  }

  public get frameWorksContorls() {
    const skillGroup = this.skillForm.controls['framework'] as FormGroup
    return skillGroup['controls']
  }
  public get programmingContorls() {
    const skillGroup = this.skillForm.controls['programmingLanguges'] as FormGroup
    return skillGroup['controls']
  }

  constructor(private _skillPresenterService: SkillRatingPresenterService, private _cdr: ChangeDetectorRef,
    private _stepperCountService: StepperCountService) {
    this.skillForm = this._skillPresenterService.skillFormGroup()
    this.isFormValid = true;
    this.unSubscribe = new Subject<any>();
    this._frameworks = []
    this._programmingLanguages = []
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
        if (typeof localStorageValue[`${item}`] === 'object' && !Array.isArray(localStorageValue[`${item}`])) {
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
 * @description this method submit from data to container
  */
  submitForm(tab: number): void {
    
    console.log(this.frameWorksContorls)
    if (this.skillForm.status !== "INVALID") {
      this._skillPresenterService.submitForm(this.skillForm.value)
      this._stepperCountService.setActiveTab(tab)
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

  public ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
