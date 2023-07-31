import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AddressDetailsPresenterService } from '../address-details-presenter/address-details-presenter.service';
import { FormGroup } from '@angular/forms';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Component({
  selector: 'app-address-details-presentation',
  templateUrl: './address-details-presentation.component.html',
  styleUrls: ['./address-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AddressDetailsPresenterService
  ]
})
export class AddressDetailsPresentationComponent {
  public addressForm: FormGroup;
  public isFormValid: boolean;
  @Output() public submitFormData: EventEmitter<any>;
  @Output() public previousClicked: EventEmitter<number>
  public cars: {
    id: number,
    name: string
  }[] = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
    ];
  constructor(private _addressPresenterService: AddressDetailsPresenterService, private _stepperCountService: StepperCountService) {
    this.addressForm = this._addressPresenterService.basicDeatilsFormGroup();
    this.isFormValid = true;
    this.submitFormData = new EventEmitter<any>()
    this.previousClicked = new EventEmitter<number>()
  }
  public get formContorls() {
    return this.addressForm.controls
  }
  public submitForm() {
    if (this.addressForm.status !== "INVALID") {
      this.submitFormData.emit({ data: this.addressForm.value, activeTab: 3 })
    }
    else {
      this.isFormValid = false;
    }
  }
  /**
   * @description emit event with previous tab number
   * @param tabNumber 
   */
  public navigatePrevious(tabNumber: number) {
    // this.previousClicked.emit(tabNumber)
    this.setActiveTab(tabNumber)
  }
  /**
   * @description This will provide value to active tab through subjet
   */
  setActiveTab(tabValue: number): void {
    this._stepperCountService.setActiveTab(tabValue)
  }
}
