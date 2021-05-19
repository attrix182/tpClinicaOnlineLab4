import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionUsuariosRoutingModule } from './seccion-usuarios-routing.module';
import { SeccionUsuariosComponent } from './seccion-usuarios.component';


@NgModule({
  declarations: [
    SeccionUsuariosComponent
  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule
  ]
})
export class SeccionUsuariosModule { }
