import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PolicyDetailsPresenterService } from '../policy-details-presenter/policy-details-presenter.service';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

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
  public policyForm: FormGroup;
  public unSubscribe: Subject<any>;

  constructor(private _policyPresenterService: PolicyDetailsPresenterService, private _stepperCountService: StepperCountService, private _cdr: ChangeDetectorRef) {
    this.policyForm = _policyPresenterService.buildPolicyForm();
    this.unSubscribe = new Subject<any>();
  }
  ngOnInit(): void {
    this._stepperCountService.submitClick$.pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      if (res.activeTab === 5) {
        this.submitForm(res.navigateTo)
      }
    })
    //patch form Value
    const localStorageValue = localStorage.getItem('policyForm')
    if (localStorageValue) {
      this.policyForm.patchValue(JSON.parse(localStorageValue))
    }
  }
  /**
   * submit form data
   */
  public submitForm(tab: number) {
    if (this.policyForm.valid) {
      this._policyPresenterService.submitForm(this.policyForm.value)
      this.navigateTab(tab)
      this._stepperCountService.setLastStepReached(true)
    }
    else {
      this.policyForm.markAsTouched()
      this._cdr.markForCheck()
    }
  }
  /**
   * navigate to previous tab
   */
  public navigateTab(tab: number) {
    this._stepperCountService.setActiveTab(tab)
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }

}
