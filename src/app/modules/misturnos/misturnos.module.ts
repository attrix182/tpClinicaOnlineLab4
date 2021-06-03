import { MisTurnosComponent } from './../../components/turnos/mis-turnos/mis-turnos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MisTurnosComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MisTurnosComponent
  ]
})
export class MisturnosModule { }
