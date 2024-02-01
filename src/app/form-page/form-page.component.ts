import { Component } from '@angular/core';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {
  places = [
    { city: 'New York', country: 'USA'},
    { city: 'London', country: 'UK'},
    { city: 'Paris', country: 'France'},
    { city: 'Tokyo', country: 'Japan'},
  ];
}
