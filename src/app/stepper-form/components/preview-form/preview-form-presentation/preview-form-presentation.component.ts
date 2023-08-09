import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PreviewFormPresenterService } from '../preview-form-presenter/preview-form-presenter.service';
import { StepperFormData } from 'src/app/stepper-form/model/index.model';

@Component({
  selector: 'app-preview-form-presentation',
  templateUrl: './preview-form-presentation.component.html',
  styleUrls: ['./preview-form-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PreviewFormPresenterService]
})
export class PreviewFormPresentationComponent implements OnInit {
  /** custom event emitter for post data to presentation */
  @Output() public sendFormData: EventEmitter<StepperFormData>;
  /** flag for print preview form */
  public isPrintEnable: boolean;

  public formData!: StepperFormData;

  constructor(private _previewPresenterService: PreviewFormPresenterService, private _cdr: ChangeDetectorRef) {
    this.isPrintEnable = false;
    this.sendFormData = new EventEmitter<StepperFormData>()
  }
  ngOnInit(): void {
    this._previewPresenterService.showDetailsOverlay()

    /**print form details */
    this._previewPresenterService.printEnable$.subscribe((data: StepperFormData) => {
      if (data) {
        this.isPrintEnable = true;
        this.formData = data;
        this._cdr.markForCheck()
        setTimeout(() => {
          window.print()
          this._previewPresenterService.setActiveTab(5)
        }, 100)
      }
    })

    /** submit form data to presentation */
    this._previewPresenterService.sendFormData$.subscribe((data: StepperFormData) => {
      if (data) {
        this.sendFormData.emit(data)
      }
    })


  }

}
