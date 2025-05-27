import { Component, input } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'form-head-component',
  imports: [BackButtonComponent],
  templateUrl: './form-head.component.html',
})
export class FormHeadComponent {
  // Propiedad entrante del componente
  title = input<string>('Form Title');
}
