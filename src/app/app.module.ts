import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { AdministrarEspecialistasComponent } from './components/administrar-especialistas/administrar-especialistas.component';
import { AgregarAdminsComponent } from './components/agregar-admins/agregar-admins.component';
import { RegistrosAdminComponent } from './components/registros-admin/registros-admin.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
