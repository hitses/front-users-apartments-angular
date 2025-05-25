import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./users/users.component') },
  {
    path: 'users/new',
    loadComponent: () => import('./users/components/new/new.component'),
  },
  {
    path: 'users/edit/:id',
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
  {
    path: 'apartments/new',
    loadComponent: () => import('./apartments/components/new/new.component'),
  },
  {
    path: 'apartments/edit/:id',
    loadComponent: () => import('./apartments/components/edit/edit.component'),
  },
  {
    path: 'apartments/:id',
    loadComponent: () =>
      import('./apartments/components/get-apartment/get-apartment.component'),
  },
  { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
