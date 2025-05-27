import { Component } from '@angular/core';
import { ChevronLeftComponent } from '../../icons/chevron-left/chevron-left.component';

@Component({
  selector: 'back-button-component',
  imports: [ChevronLeftComponent],
  templateUrl: './back-button.component.html',
})
export class BackButtonComponent {
  // Método que envía hacia atrás en el historial de navegación al usuario, pudiendo dar lugar a un error si es la primera página que visita, pero nada preocupante o visible, puesto que simplemente no accionaría ningún evento
  goBack() {
    window.history.back();
  }
}
