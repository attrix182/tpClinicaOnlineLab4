import { KeysFormatPipe } from './../../pipes/keys-format.pipe';
import { KeysDatosPipe } from './../../pipes/keys-datos.pipe';
import { MiPerfilComponent } from './../../components/mi-perfil/mi-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MiPerfilComponent, KeysFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [
    MiPerfilComponent]
})
export class MiPerfilModule { }
