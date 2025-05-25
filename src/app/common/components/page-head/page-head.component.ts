import { Component, input } from '@angular/core';
import { PageTitleComponent } from '../page-title/page-title.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-head-component',
  imports: [PageTitleComponent, RouterLink],
  templateUrl: './page-head.component.html',
})
export class PageHeadComponent {
  pageTitle = input<string>('Page title');
  link = input<string>('/users');
  linkText = input<string>('Users');
}
