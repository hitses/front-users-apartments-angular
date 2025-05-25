import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./users/users.component') },
  {
    path: 'apartments',
    loadComponent: () => import('./apartments/apartments.component'),
  },
  { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
