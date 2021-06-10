import { KeyValuePipe } from './../../pipes/key-value.pipe';
import { KeysDatosPipe } from './../../pipes/keys-datos.pipe';

import { MouseHoverImagenDirective } from './../../directivas/mouse-hover-imagen.directive';
import { MouseHoverDirective } from './../../directivas/mouse-hover.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SacarTurnoComponent } from '../../components/turnos/sacar-turno/sacar-turno.component';

@NgModule({
  declarations: [SacarTurnoComponent, MouseHoverDirective, MouseHoverImagenDirective],
  imports: [
    CommonModule
  ],
  exports:[
    SacarTurnoComponent
  ]
})
export class TurnosSharedModule { }



