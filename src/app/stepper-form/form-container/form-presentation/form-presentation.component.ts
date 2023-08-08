import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormPresenterService } from '../form-presenter/form-presenter.service';
import { StepperCountService } from '../../services/stepper-count.service';
import { Subscription } from 'rxjs';
import { SelectOption } from '../../model/index.model';

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

  @Input() public projectList!: SelectOption[];
  @Input() public positionList!: SelectOption[];
  @Input() public frameWorkList!: SelectOption[];
  @Input() public languageList!: SelectOption[];

  @Input() public set countryAndState(v: any) {
    this._countryAndState = v;
  }
  public get countryAndState(): any {
    return this._countryAndState;
  }

  @Input() public set contryAndCity(v: any) {
    this._contryAndCity = v;
  }
  public get contryAndCity(): any {
    return this._contryAndCity;
  }

  @Output() sendData:EventEmitter<any>;
  public country: SelectOption[];
  public count: number;
  public stepperCountSub: Subscription;

  private _countryAndState: any;
  private _contryAndCity: any;

  constructor(private _formPresenterService: FormPresenterService, private _stepperCountService: StepperCountService,
    private _cdr: ChangeDetectorRef) {
    this.count = this._formPresenterService.activeTab;
    this.stepperCountSub = new Subscription();
    this.country = [];
    this.sendData = new EventEmitter<any>();
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
   * send post data to container
   * @param data 
   */
  sendDataToParent(data:any):void {
    this.sendData.emit(data)
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
