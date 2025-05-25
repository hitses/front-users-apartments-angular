import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'header-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export default class HeaderComponent {}
