import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SelectOption } from 'src/app/stepper-form/model/index.model';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { SkillRatingPresenterService } from '../skill-rating-presenter/skill-rating-presenter.service';
import { SkillDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { StepperForm } from 'src/app/shared/custom-stepper/model';

@Component({
  selector: 'app-skill-rating-presentation',
  templateUrl: './skill-rating-presentation.component.html',
  styleUrls: ['./skill-rating-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkillRatingPresenterService]
})
export class SkillRatingPresentationComponent implements OnInit, OnDestroy, StepperForm {
  /** Input and setter for framwork list */
  @Input() public set frameworks(v: SelectOption[]) {
    this._frameworks = v;
  }
  /**getter for framework list of ng select */
  public get frameworks(): SelectOption[] {
    return this._frameworks;
  }

  /** Input and setter for programming language list */
  @Input() public set programmingLanguages(v: SelectOption[]) {
    this._programmingLanguages = v;
  }
  /**getter for programming language list of ng select */
  public get programmingLanguages(): SelectOption[] {
    return this._programmingLanguages;
  }

  /**form instance of skill form */
  public skillForm: FormGroup;
  /** flag for form validation when user submit form */
  public isFormValid: boolean;
  /** subject for unsubscribe observer */
  public unSubscribe: Subject<void>;

  /**framework list */
  private _frameworks: SelectOption[];
  /**programming langauge list */
  private _programmingLanguages: SelectOption[];

  /**get all form controls for validation */
  public get formContorls(): { [key: string]: AbstractControl } {
    return this.skillForm.controls;
  }

  /**get nested framework group controls for validation */
  public get frameWorksContorls(): { [key: string]: AbstractControl } {
    const skillGroup = this.skillForm.controls['framework'] as FormGroup
    return skillGroup['controls']
  }
  /** get nested programming language group controls for validation */
  public get programmingContorls(): { [key: string]: AbstractControl } {
    const skillGroup = this.skillForm.controls['programmingLanguges'] as FormGroup
    return skillGroup['controls']
  }

  constructor(private skillPresenterService: SkillRatingPresenterService, private cdr: ChangeDetectorRef,
    private stepperCountService: StepperCountService) {
    this.skillForm = this.skillPresenterService.skillFormGroup()
    this.isFormValid = true;
    this.unSubscribe = new Subject<void>();
    this._frameworks = []
    this._programmingLanguages = []
  }

  ngOnInit(): void {
    /** patch form value from local storage */
    const localStorageValue = JSON.parse(localStorage.getItem(SkillDetails)!)
    if (localStorageValue) {
      for (let item in localStorageValue) {
        if (typeof localStorageValue[`${item}`] === 'object' && !Array.isArray(localStorageValue[`${item}`])) {
          const nestedGroup = this.skillForm.controls[`${item}`] as FormGroup
          this.skillPresenterService.addControls(nestedGroup, localStorageValue[`${item}`])
        }
      }
      this.skillForm.patchValue(localStorageValue)
    }
  }

  /**
   * @description Add range controls in the nested form group
   * @param controlName Name of the control
   * @param parentGroup Name of fromgroup where control should add
   */
  public onSelectChange(controlName: string, parentGroup: string): void {
    if (controlName) {
      this.skillPresenterService.addControlToNestedGroup(this.skillForm, controlName, parentGroup)
    }
  }
  /**
   * @description Remove range control from the Group 
   * @param object Object of event
   * @param parentGroup Name of fromgroup from where control will remove.
   */
  public onDeselectChange(object: any, parentGroup: string): void {
    this.skillPresenterService.removeControlFromNestedGroup(this.skillForm, object.value, parentGroup)
  }
  /**
   * @description save form data
   * @param tab tab number where user will navigate
   */
  public submitForm(): void {
    if (this.skillForm.status !== "INVALID") {
      this.skillPresenterService.submitForm(this.skillForm.value)
    }
    else {
      this.isFormValid = false;
      this.cdr.markForCheck()
    }
  }

  /**
   * @description change state of nested form group to touched
   * @param name nested form group name
   */
  public markFormGroupAsTouched(name: string): void {
    this.skillForm.controls[`${name}`].markAsTouched()
  }
  /** get form group for parent access */
  getFormData(): FormGroup<any> {
    return this.skillForm
  }
  
  public ngOnDestroy(): void {
    this.unSubscribe.next()
    this.unSubscribe.unsubscribe()
  }
}
