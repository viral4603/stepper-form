import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PreviewFormPresenterService } from '../preview-form-presenter/preview-form-presenter.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FormPreviewComponent } from 'src/app/shared/form-preview/form-preview.component';

@Component({
  selector: 'app-preview-form-presentation',
  templateUrl: './preview-form-presentation.component.html',
  styleUrls: ['./preview-form-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PreviewFormPresenterService]
})
export class PreviewFormPresentationComponent implements OnInit {
  public isPrintEnable: boolean;
  public formData: any;
  @Output() public sendFormData:EventEmitter<any>;

  constructor(private _previewPresenterService: PreviewFormPresenterService, private _cdr: ChangeDetectorRef) {
    this.isPrintEnable = false;
    this.sendFormData = new EventEmitter<any>()
  }
  ngOnInit(): void {
    this._previewPresenterService.showDetailsOverlay()

    //print form 
    this._previewPresenterService.printEnable$.subscribe((res: boolean) => {
      if (res) {
        this.isPrintEnable = true;
        this.formData = res;
        this._cdr.markForCheck()
        setTimeout(() => {
          window.print()
          this._previewPresenterService.setActiveTab(5)
        }, 100)
      }
    })

    //submitFormData
    this._previewPresenterService.sendFormData$.subscribe((res: any) => {
      if(res) {
        this.sendFormData.emit(res)
      }
    })


  }

}
