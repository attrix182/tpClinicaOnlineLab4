import { MisturnosModule } from './../../modules/misturnos/misturnos.module';
import { TurnosSharedModule } from '../../modules/turnos/turnos-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { MiPerfilModule } from 'src/app/modules/mi-perfil/mi-perfil.module';


@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    TurnosSharedModule,
    MisturnosModule,
    MiPerfilModule
  ]
})
export class PacienteModule { }
