import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',

  },
  
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  
  { path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) },
  
  { path: 'especialista', loadChildren: () => import('./pages/especialista/especialista.module').then(m => m.EspecialistaModule) },
  
  { path: 'paciente', loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule) },
  
  { path: 'seccionUsuarios', loadChildren: () => import('./pages/seccion-usuarios/seccion-usuarios.module').then(m => m.SeccionUsuariosModule) },
  
  { path: '**', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule) }];
  
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
