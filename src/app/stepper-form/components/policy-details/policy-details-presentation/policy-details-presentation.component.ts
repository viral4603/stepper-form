import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { PolicyDetailsPresenterService } from '../policy-details-presenter/policy-details-presenter.service';
import { PolicyDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { StepperForm } from 'src/app/shared/custom-stepper/model';

@Component({
  selector: 'app-policy-details-presentation',
  templateUrl: './policy-details-presentation.component.html',
  styleUrls: ['./policy-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PolicyDetailsPresenterService
  ]
})
export class PolicyDetailsPresentationComponent implements StepperForm {
  /** policy form instance */
  public policyForm: FormGroup;
  /** subject for unsbscribe observable */
  public unSubscribe: Subject<void>;

  constructor(private policyPresenterService: PolicyDetailsPresenterService, private stepperCountService: StepperCountService, private cdr: ChangeDetectorRef) {
    this.policyForm = policyPresenterService.buildPolicyForm();
    this.unSubscribe = new Subject<void>();
  }


  ngOnInit(): void {
    /** patch form values */
    const localStorageValue = localStorage.getItem(PolicyDetails)
    if (localStorageValue) {
      this.policyForm.patchValue(JSON.parse(localStorageValue))
    }
  }
  /**
   * submit form data 
   * @param tab tab number where user will navigate
   */
  public submitForm() {
    if (this.policyForm.valid) {
      this.policyPresenterService.submitForm(this.policyForm.value)
    }
    else {
      this.policyForm.markAsTouched()
      this.cdr.markForCheck()
    }
  }
  
  getFormData(): FormGroup<any> {
    return this.policyForm
  }

  ngOnDestroy(): void {
    this.unSubscribe.next()
    this.unSubscribe.unsubscribe()
  }

}
