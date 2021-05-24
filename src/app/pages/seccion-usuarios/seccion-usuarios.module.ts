import { RegistroSharedModule } from './../../modules/registro-shared/registro-shared.module';
import { RegisterComponent } from './../../components/register/register.component';
import { AgregarAdminsComponent } from './../../components/agregar-admins/agregar-admins.component';
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
    AgregarAdminsComponent

  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule,
    RegistroSharedModule
  ]
})
export class SeccionUsuariosModule { }
