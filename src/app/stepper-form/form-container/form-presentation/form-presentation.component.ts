import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormPresenterService } from '../form-presenter/form-presenter.service';
import { StepperCountService } from '../../services/stepper-count.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-presentation',
  templateUrl: './form-presentation.component.html',
  styleUrls: ['./form-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FormPresenterService
  ]
})
export class FormPresentationComponent implements OnInit, OnDestroy {
  public count: number;
  public stepperCountSub: Subscription;
  constructor(private _formPresenterService: FormPresenterService, private _stepperCountService: StepperCountService,
    private _cdr: ChangeDetectorRef) {
    this.count = this._formPresenterService.activeTab;
    this.stepperCountSub = new Subscription();
  }
  ngOnInit(): void {
    this.stepperCountSub = this._stepperCountService.activeCount$.subscribe((res: any) => {
      this.count = res;
      this._cdr.markForCheck()
    })
  }
  /**
   * @param data form data comes from presentaions 
   * @param count activeTab number
   */
  submitFormData(data: any): void {
    this.count = data.activeTab
    this._formPresenterService.submitFormData(data)
  }
  /**
   * @description navigate user to previous tab
   * @param count tab number
   */
  navigateOnPreviousTab(count: any) {
    this.count = count
  }
  ngOnDestroy(): void {
    this.stepperCountSub.unsubscribe();
  }
}
