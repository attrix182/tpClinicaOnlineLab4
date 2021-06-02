import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorariosSharedModule } from 'src/app/modules/turnos/horarios-shared.module';
import { MiPerfilSharedModule } from './../../modules/turnos/miPerfil-shared.module';
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
    MiPerfilSharedModule,
    HorariosSharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EspecialistaModule { }
