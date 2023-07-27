import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { BasicDetailsPresenterService } from '../basic-details-presenter/basic-details-presenter.service';

@Component({
  selector: 'app-basic-details-presentation',
  templateUrl: './basic-details-presentation.component.html',
  styleUrls: ['./basic-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    BasicDetailsPresenterService
  ],
})
export class BasicDetailsPresentationComponent {
  constructor() {
    
  }
}
