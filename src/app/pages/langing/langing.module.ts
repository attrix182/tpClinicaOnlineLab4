import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LangingRoutingModule } from './langing-routing.module';
import { LangingComponent } from './langing.component';


@NgModule({
  declarations: [
    LangingComponent
  ],
  imports: [
    CommonModule,
    LangingRoutingModule
  ]
})
export class LangingModule { }
