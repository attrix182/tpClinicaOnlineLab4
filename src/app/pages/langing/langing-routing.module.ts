import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LangingComponent } from './langing.component';

const routes: Routes = [{ path: '', component: LangingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LangingRoutingModule { }
