import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './../../components/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  exports:[
    RegisterComponent
  ]
  
})
export class RegistroSharedModule { }
