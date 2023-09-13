import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CountWidgetStyles } from 'src/app/shared/custom-stepper/model';
import { SelectOption, StepperFormData } from '../../model/index.model';
import { StepperCountService } from '../../services/stepper-count.service';
import { FormPresenterService } from '../form-presenter/form-presenter.service';

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
  public stepperCountSubcription: Subscription;

  /** custom count widget shape css */
  public countWidgetStyles: CountWidgetStyles;

  /** list of country with state */
  private _countryAndState: any;
  /** list of country with city */
  private _contryAndCity: any;

  /** form Group */
  public myForm: FormGroup;


  constructor(private stepperCountService: StepperCountService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) {
    this.count = 1;
    this.stepperCountSubcription = new Subscription();
    this.country = [];
    this.sendData = new EventEmitter<StepperFormData>();
    this.countWidgetStyles = {
      colors: {
        default: '#008DFF',
        background: '#e9ecef',
        active: '#3bcb44',
        activeBg: '#e9ecef',
        completed: '#ffffff',
        completedBg: '#008DFF'
      },
      shape: 'square',
      orientation: 'horizontal'
    }
    this.myForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.stepperCountSubcription = this.stepperCountService.activeCount$.subscribe((res: any) => {
      this.count = res;
      this.cdr.markForCheck()
    })
  }

  /**
   * send final form data to conatiner
   * @param data final form data
   */
  public sendDataToParent(data: StepperFormData): void {
    this.sendData.emit(data)
  }

  ngOnDestroy(): void {
    this.stepperCountSubcription.unsubscribe();
  }
}
