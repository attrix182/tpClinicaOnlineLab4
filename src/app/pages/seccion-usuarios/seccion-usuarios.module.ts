import { AdminSharedModule } from './../../modules/registro-shared/admin-shared.module';

import { RegistroSharedModule } from './../../modules/registro-shared/registro-shared.module';
import { AdministrarEspecialistasComponent } from './../../components/administrar-especialistas/administrar-especialistas.component';
import { ListadoUsuariosComponent } from './../../components/listado-usuarios/listado-usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionUsuariosRoutingModule } from './seccion-usuarios-routing.module';
import { SeccionUsuariosComponent } from './seccion-usuarios.component';


@NgModule({
  declarations: [
    SeccionUsuariosComponent,
    ListadoUsuariosComponent,
    AdministrarEspecialistasComponent

  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule,
    RegistroSharedModule,
    AdminSharedModule
  ]
})
export class SeccionUsuariosModule { }
