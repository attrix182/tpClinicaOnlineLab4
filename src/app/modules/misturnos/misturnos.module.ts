import { KeysDatosPipe } from './../../pipes/keys-datos.pipe';

import { MayusculasPipe } from './../../pipes/mayusculas.pipe';
import { ClickEmojiDirective } from './../../directivas/click-emoji.directive';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisTurnosComponent } from './../../components/turnos/mis-turnos/mis-turnos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MisTurnosComponent, ClickEmojiDirective, MayusculasPipe, KeysDatosPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    MisTurnosComponent
  ]
})
export class MisturnosModule { }
