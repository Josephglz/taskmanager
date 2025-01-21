import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard, loggedGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Lista de Tareas',
    component: AppComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent,
    canActivate: [loggedGuard]
  },
  {
    path: 'register',
    title: 'Registrarse',
    component: RegisterComponent,
    canActivate: [loggedGuard]
  }
];
