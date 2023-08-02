import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PolicyDetailsPresenterService } from '../policy-details-presenter/policy-details-presenter.service';

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

  constructor(private _policyPresenterService: PolicyDetailsPresenterService) {
    this.policyForm = _policyPresenterService.buildPolicyForm()
  }
  /**
   * submit form data
   */
  public submitForm() {
    if (this.policyForm.valid) {
      this._policyPresenterService.submitForm()
    }
    else {
      this.policyForm.markAsTouched()
    }
  }
  /**
   * navigate to previous tab
   */
  public navigateTab(tab:number) {
    this._policyPresenterService.navigatePrevious(tab)
  }

}
