import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  features = [
    'Angular standalone components written in TypeScript',
    'Routing between Home, Weather and About pages',
    'Template-driven form with validation (ngModel)',
    'Form value bound to the component and shown as sample weather',
  ];
}
