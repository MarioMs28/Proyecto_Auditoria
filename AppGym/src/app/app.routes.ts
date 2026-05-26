import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Reproductor } from './Pages/reproductor/reproductor';
import { Dasboard } from './Pages/dasboard/dasboard';
import { Formulario } from './Pages/formulario/formulario';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'formulario', component: Formulario },
  { path: 'dashboard', component: Dasboard },
  { path: 'reproductor', component: Reproductor },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
