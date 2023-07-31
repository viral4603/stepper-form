import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { BasicDetailsPresenterService } from '../basic-details-presenter/basic-details-presenter.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-details-presentation',
  templateUrl: './basic-details-presentation.component.html',
  styleUrls: ['./basic-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BasicDetailsPresenterService
  ],
})
export class BasicDetailsPresentationComponent {
  @Output() public submitFormData:EventEmitter<any>;
  public basicDetails: FormGroup;
  public isFormValid: boolean;

  constructor(private _presenterService: BasicDetailsPresenterService) {
    this.basicDetails = this._presenterService.basicDeatilsFormGroup();
    this.isFormValid = true;
    this.submitFormData = new EventEmitter<any>()
  }
  //get forms all controls
  get formContorls() {
    return this.basicDetails.controls
  }
  /**
   * @description this method submit from data to container
   */
  submitForm(): void {
    if (this.basicDetails.status !== "INVALID") {
      this._presenterService.submitForm(this.basicDetails.value)
      this.submitFormData.emit({ data:this.basicDetails.value,activeTab:2})
    }
    else {
      this.isFormValid = false;
    }
  }
}
