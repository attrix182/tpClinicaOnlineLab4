import { FormsModule } from '@angular/forms';
import { MiPerfilComponent } from './../../components/mi-perfil/mi-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [MiPerfilComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MiPerfilComponent
  ]
})
export class MiPerfilSharedModule { }
