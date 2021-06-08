import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionarTurnosComponent } from './../../components/turnos/gestionar-turnos/gestionar-turnos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [GestionarTurnosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:
  [
    GestionarTurnosComponent
  ]
})
export class GestionTurnoSharedModule { }
