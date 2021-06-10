import { PrimerLetraMayusPipe } from './../../pipes/primer-letra-mayus.pipe';

import { BotonesLoginDirective } from './../../directivas/botones-login.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonInicioRapidoComponent } from '../../components/boton-inicio-rapido/boton-inicio-rapido.component';


@NgModule({
  declarations: [
    LoginComponent,
    BotonInicioRapidoComponent,
    BotonesLoginDirective,
    PrimerLetraMayusPipe
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule { }
