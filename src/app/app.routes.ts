import { Routes } from '@angular/router';

// Rutas de la aplicación
// Se han definido aquí todas las rutas al ser una aplicación pequeña, pero en la práctica se crean archivos de rutas específicas para cada sección de la aplicación. Esto dependerá enormemente del modelo de negocio.
export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirecciona a la ruta de usuarios si no se especifica ninguna ruta o si se accede a una ruta vacía
  { path: 'users', loadComponent: () => import('./users/users.component') },
  {
    path: 'users/new',
    loadComponent: () => import('./users/components/new/new.component'),
  },
  {
    path: 'users/edit/:id',
    loadComponent: () => import('./users/components/edit/edit.component'),
  },
  // Se ubica en esta posición la ruta de usuario por ID para que 'new' tenga prioridad de carga y no intente cargar el usuario con el ID 'new'
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
  // Se ubica en esta posición la ruta de apartamento por ID para que 'new' tenga prioridad de carga y no intente cargar el apartamento con el ID 'new'
  {
    path: 'apartments/:id',
    loadComponent: () =>
      import('./apartments/components/get-apartment/get-apartment.component'),
  },
  // Ruta para redireccionar a la página de usuarios si se accede a una ruta inexistente, ya que no se ha creado la ruta 404
  { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
