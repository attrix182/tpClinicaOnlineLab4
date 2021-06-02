
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SacarTurnoComponent } from '../../components/turnos/sacar-turno/sacar-turno.component';

@NgModule({
  declarations: [SacarTurnoComponent],
  imports: [
    CommonModule
  ],
  exports:[
    SacarTurnoComponent
  ]
})
export class TurnosSharedModule { }
