import { Paciente } from './../clases/paciente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore,AngularFirestoreCollection,} from '@angular/fire/firestore/';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  rutaDeLaColeccion = '/pacientes';
  referenciaAlaColeccion: AngularFirestoreCollection<Paciente>;
  referenciaBd: AngularFirestore;

  constructor(private bd: AngularFirestore,private http: HttpClient) {
    this.referenciaBd = bd;
    this.referenciaAlaColeccion = bd.collection(this.rutaDeLaColeccion);
  }

  Crear(paciente: Paciente): any {
    let id = this.bd.createId();
    paciente.id = id;
    return this.referenciaAlaColeccion.add({ ...paciente });
  }


  public TraerTodos() {
    return this.referenciaAlaColeccion;
  }

  public BuscarUsuario(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccion, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  }

}