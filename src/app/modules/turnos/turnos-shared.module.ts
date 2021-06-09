import { MouseHoverDirective } from './../../directivas/mouse-hover.directive';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SacarTurnoComponent } from '../../components/turnos/sacar-turno/sacar-turno.component';

@NgModule({
  declarations: [SacarTurnoComponent, MouseHoverDirective],
  imports: [
    CommonModule
  ],
  exports:[
    SacarTurnoComponent
  ]
})
export class TurnosSharedModule { }
