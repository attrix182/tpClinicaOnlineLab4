import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './../../components/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterComponent
  ]
  
})
export class RegistroSharedModule { }
