import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectDetailsPresenterService } from '../project-details-presenter/project-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-project-details-presentation',
  templateUrl: './project-details-presentation.component.html',
  styleUrls: ['./project-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectDetailsPresenterService]
})
export class ProjectDetailsPresentationComponent implements OnInit, OnDestroy {
  public cars: any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  public today: string = new Date().toISOString().split('T')[0];
  public isFormValid: boolean;
  public unSubscribe: Subject<any>
  get formContorls() {
    return this.projectDetailsForm.controls
  }
  public projectDetailsForm: FormGroup;
  constructor(private _projectDetailsPresenterService: ProjectDetailsPresenterService,
    private _cdr: ChangeDetectorRef,
    private _stepperCountService: StepperCountService) {
    this.isFormValid = true;
    this.projectDetailsForm = this._projectDetailsPresenterService.buildProjectDetailsForm()
    this.unSubscribe = new Subject<any>();
  }
  ngOnInit(): void {
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res === 5) {
        this.submitForm(res)
      }
    })
    //patch form Value
    const localStorageValue = localStorage.getItem('projectDetails')
    if (localStorageValue) {
      this.projectDetailsForm.patchValue(JSON.parse(localStorageValue))
    }
  }

  /**
   * call presenter method 
   */
  submitForm(tab: number) {
    if (this.projectDetailsForm.status !== 'INVALID') {
      console.log(this.projectDetailsForm)
      this._projectDetailsPresenterService.submitForm(this.projectDetailsForm.value)
      this.navigateTab(tab)
    }
    else {
      this.isFormValid = false
      this._cdr.markForCheck()
    }
  }
  /**
   *@description navigation
   */
  navigateTab(tab: number) {
    this._stepperCountService.setActiveTab(tab)
  }
  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
