import { AgregarAdminsComponent } from './../../components/agregar-admins/agregar-admins.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AgregarAdminsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AgregarAdminsComponent
  ]
  
})
export class AdminSharedModule { }
