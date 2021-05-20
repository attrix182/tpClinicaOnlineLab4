import { AgregarAdminsComponent } from './../../components/agregar-admins/agregar-admins.component';
import { RegistrosAdminComponent } from './../../components/registros-admin/registros-admin.component';
import { LoginComponent } from './../login/login.component';
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
    AdministrarEspecialistasComponent,
    RegistrosAdminComponent,
    AgregarAdminsComponent
  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule
  ]
})
export class SeccionUsuariosModule { }
