import { TurnosSharedModule } from '../../modules/registro-shared/turnos-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';


@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    TurnosSharedModule
  ]
})
export class PacienteModule { }
