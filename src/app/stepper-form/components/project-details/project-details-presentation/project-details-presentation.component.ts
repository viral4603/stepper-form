import { Component } from '@angular/core';

@Component({
  selector: 'app-project-details-presentation',
  templateUrl: './project-details-presentation.component.html',
  styleUrls: ['./project-details-presentation.component.scss']
})
export class ProjectDetailsPresentationComponent {
  public cars:any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
];
}
