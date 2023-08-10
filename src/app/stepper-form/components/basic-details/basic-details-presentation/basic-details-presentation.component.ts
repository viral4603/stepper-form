import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { BasicDetailsPresenterService } from '../basic-details-presenter/basic-details-presenter.service';
import { BasicDetails } from 'src/app/stepper-form/constant/stpper.constant';

@Component({
  selector: 'app-basic-details-presentation',
  templateUrl: './basic-details-presentation.component.html',
  styleUrls: ['./basic-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BasicDetailsPresenterService
  ],
})
export class BasicDetailsPresentationComponent implements OnInit, OnDestroy {
  /** form instance of basic details form */
  public basicDetails: FormGroup;
  /** validition flag while user submit form */
  public isFormValid: boolean;
  /** subject for unsubscribe observable */
  public unSubscribe: Subject<void>

  constructor(private presenterService: BasicDetailsPresenterService, private stepperCountService: StepperCountService,
    private cdr: ChangeDetectorRef) {
    this.basicDetails = this.presenterService.basicDeatilsFormGroup();
    this.isFormValid = true;
    this.unSubscribe = new Subject<void>();

  }


  /** all form controls for validtion */
  get formContorls() {
    return this.basicDetails.controls
  }

  ngOnInit(): void {
 
    this.stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 1) {
        this.submitForm(res.navigateTo)
      }
    })
    /** patch form value from local storage */
    const localStorageValue = localStorage.getItem(BasicDetails)
    if (localStorageValue) {
      this.basicDetails.patchValue(JSON.parse(localStorageValue))
    }
  }

  /**
   * Submit form data to presenter service
   * @param tab tab nuber where user will navigate after form submit
   */
  public submitForm(tab: number): void {
    if (this.basicDetails.status !== "INVALID") {
      this.presenterService.submitForm(this.basicDetails.value)
      this.stepperCountService.setActiveTab(tab)
    }
    else {
      this.isFormValid = false;
      this.cdr.markForCheck()
    }
  }
  
  ngOnDestroy(): void {
    this.unSubscribe.next()
    this.unSubscribe.unsubscribe()
  }
}
