import { Component } from '@angular/core';
import { ChevronLeftComponent } from '../../icons/chevron-left/chevron-left.component';

@Component({
  selector: 'back-button-component',
  imports: [ChevronLeftComponent],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  goBack() {
    window.history.back();
  }
}
