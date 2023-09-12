import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProjectDetailsPresenterService } from '../project-details-presenter/project-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SelectOption } from 'src/app/stepper-form/model/index.model';
import { ProjectDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { StepperForm } from 'src/app/shared/custom-stepper/model';

@Component({
  selector: 'app-project-details-presentation',
  templateUrl: './project-details-presentation.component.html',
  styleUrls: ['./project-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectDetailsPresenterService]
})
export class ProjectDetailsPresentationComponent implements OnInit, OnDestroy, StepperForm {
  /**Input and setter of project list */
  @Input() public set projects(v: SelectOption[]) {
    this._projects = v;
  }
  /** getter for project list of ng select */
  public get projects(): SelectOption[] {
    return this._projects;
  }

  /**Input and setter of positon list */
  @Input() public set positions(v: SelectOption[]) {
    this._positions = v;
  }
  /** getter for position list of ng select */
  public get positions(): SelectOption[] {
    return this._positions;
  }

  /** form instance of Project details form */
  public projectDetailsForm: FormGroup;
  /**current date for validation */
  public today: string = new Date().toISOString().split('T')[0];
  /** flag for validation when user submit form */
  public isFormValid: boolean;
  /** subject for unsubscribe obserable */
  public unSubscribe: Subject<void>
  /** Project list */
  private _projects: SelectOption[];
  /** position list */
  private _positions: SelectOption[];
  /** get all form controls for validation */
  get formContorls() {
    return this.projectDetailsForm.controls
  }

  constructor(private projectDetailsPresenterService: ProjectDetailsPresenterService,
    private cdr: ChangeDetectorRef,
    private stepperCountService: StepperCountService) {
    this.isFormValid = true;
    this.projectDetailsForm = this.projectDetailsPresenterService.buildProjectDetailsForm()
    this.unSubscribe = new Subject<void>();
    this._projects = []
    this._positions = []
  }


  ngOnInit(): void {
    /** patch form value from form controler */
    const localStorageValue = localStorage.getItem(ProjectDetails)
    if (localStorageValue) {
      this.projectDetailsForm.patchValue(JSON.parse(localStorageValue))
    }
  }

  /**
   * save form data 
   * @param tab tab number where user will navigate after form submit
   */
  public submitForm(): void {
    if (this.projectDetailsForm.status !== 'INVALID') {
      this.projectDetailsPresenterService.submitForm(this.projectDetailsForm.value)
    }
    else {
      this.isFormValid = false
      this.cdr.markForCheck()
    }
  }
  
  getFormData(): FormGroup<any> {
    return this.projectDetailsForm
  }


  ngOnDestroy(): void {
    this.unSubscribe.next()
    this.unSubscribe.unsubscribe()
  }
}
