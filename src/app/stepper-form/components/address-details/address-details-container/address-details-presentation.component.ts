import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddressDetailsPresenterService } from '../address-details-presenter/address-details-presenter.service';

@Component({
  selector: 'app-address-details-presentation',
  templateUrl: './address-details-presentation.component.html',
  styleUrls: ['./address-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    AddressDetailsPresenterService
  ]
})
export class AddressDetailsPresentationComponent {
  
  public cars:any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
];
}
