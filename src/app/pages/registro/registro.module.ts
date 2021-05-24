import { RegistroSharedModule } from './../../modules/registro-shared/registro-shared.module';
import { RegisterComponent } from './../../components/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroSharedModule
  ]
})
export class RegistroModule { }
