import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormPresenterService } from '../form-presenter/form-presenter.service';
import { StepperCountService } from '../../services/stepper-count.service';
import { Subscription } from 'rxjs';
import { SelectOption, StepperFormData } from '../../model/index.model';

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
  /** Input for list of project */
  @Input() public projectList!: SelectOption[];
  /** Input for list of positon */
  @Input() public positionList!: SelectOption[];
  /** Input for list of framework */
  @Input() public frameWorkList!: SelectOption[];
  /** Input for list of programming languges */
  @Input() public languageList!: SelectOption[];

  /** Input and setter of list of country with state */
  @Input() public set countryAndState(value: any) {
    this._countryAndState = value;
  }
  /** getter of country list with state */
  public get countryAndState(): any {
    return this._countryAndState;
  }

  /** Input and setter of list of country with city */
  @Input() public set contryAndCity(value: any) {
    this._contryAndCity = value;
  }
  /** setter of country with city */
  public get contryAndCity(): any {
    return this._contryAndCity;
  }
  /** custom event for send data to container */
  @Output() sendData: EventEmitter<StepperFormData>;

  /** country list */
  public country: SelectOption[];
  /** active tab number */
  public count: number;
  /** subscriber of step numbers */
  public stepperCountSub: Subscription;

  /** list of country with state */
  private _countryAndState: any;
  /** list of country with city */
  private _contryAndCity: any;

  constructor(private _stepperCountService: StepperCountService,
    private _cdr: ChangeDetectorRef) {
    this.count = 1;
    this.stepperCountSub = new Subscription();
    this.country = [];
    this.sendData = new EventEmitter<StepperFormData>();
  }

  ngOnInit(): void {
    this.stepperCountSub = this._stepperCountService.activeCount$.subscribe((res: any) => {
      this.count = res;
      this._cdr.markForCheck()
    })
  }

  /**
   * send final form data to conatiner
   * @param data final form data
   */
  sendDataToParent(data: StepperFormData): void {
    this.sendData.emit(data)
  }

  ngOnDestroy(): void {
    this.stepperCountSub.unsubscribe();
  }
}
