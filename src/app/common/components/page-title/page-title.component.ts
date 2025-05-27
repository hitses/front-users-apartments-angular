import { Component, input } from '@angular/core';

@Component({
  selector: 'page-title-component',
  imports: [],
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {
  // Propiedad del componente
  title = input<string>('Page title');
}
