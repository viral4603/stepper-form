import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { PolicyDetailsPresenterService } from '../policy-details-presenter/policy-details-presenter.service';
import { PolicyDetails } from 'src/app/stepper-form/constant/stpper.constant';

@Component({
  selector: 'app-policy-details-presentation',
  templateUrl: './policy-details-presentation.component.html',
  styleUrls: ['./policy-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PolicyDetailsPresenterService
  ]
})
export class PolicyDetailsPresentationComponent {
  /** policy form instance */
  public policyForm: FormGroup;
  /** subject for unsbscribe observable */
  public unSubscribe: Subject<boolean>;

  constructor(private _policyPresenterService: PolicyDetailsPresenterService, private _stepperCountService: StepperCountService, private _cdr: ChangeDetectorRef) {
    this.policyForm = _policyPresenterService.buildPolicyForm();
    this.unSubscribe = new Subject<boolean>();
  }

  ngOnInit(): void {
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 5) {
        this.submitForm(res.navigateTo)
      }
    })
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
  public submitForm(tab: number) {
    if (this.policyForm.valid) {
      this._policyPresenterService.submitForm(this.policyForm.value)
      this._stepperCountService.setActiveTab(tab)
      this._stepperCountService.setLastStepReached(true)
    }
    else {
      this.policyForm.markAsTouched()
      this._cdr.markForCheck()
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }

}
