import { MiPerfilModule } from './../../modules/mi-perfil/mi-perfil.module';
import { GestionTurnoSharedModule } from './../../modules/gestion-turno-shared/gestion-turno-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorariosSharedModule } from 'src/app/modules/turnos/horarios-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { EspecialistaComponent } from './especialista.component';


@NgModule({
  declarations: [
    EspecialistaComponent
  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    MiPerfilModule,
    HorariosSharedModule,
    FormsModule,
    ReactiveFormsModule,
    GestionTurnoSharedModule
  ]
})
export class EspecialistaModule { }
