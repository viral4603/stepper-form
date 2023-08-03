import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  constructor(private _previewPresenterService:PreviewFormPresenterService) {

  }
  ngOnInit(): void {
    this._previewPresenterService.showDetailsOverlay()
  }

}
