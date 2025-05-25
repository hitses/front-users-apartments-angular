import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./users/users.component') },
  {
    path: 'users/new',
    loadComponent: () => import('./users/components/new/new.component'),
  },
  {
    path: 'users/edit',
    loadComponent: () => import('./users/components/edit/edit.component'),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./users/components/get-user/get-user.component'),
  },
  {
    path: 'apartments',
    loadComponent: () => import('./apartments/apartments.component'),
  },
  { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
