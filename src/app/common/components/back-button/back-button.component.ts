import { Component } from '@angular/core';

@Component({
  selector: 'back-button-component',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  goBack() {
    window.history.back();
  }
}
