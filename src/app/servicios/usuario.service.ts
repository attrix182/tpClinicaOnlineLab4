import { Especialista } from './../clases/especialista';
import { Paciente } from './../clases/paciente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore,AngularFirestoreCollection,} from '@angular/fire/firestore/';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  rutaDeLaColeccionPaciente = '/pacientes';
  rutaDeLaColeccionEspecialista = '/especialistas';
  referenciaAlaColeccionPaciente: AngularFirestoreCollection<Paciente>;
  referenciaAlaColeccionEspecialista: AngularFirestoreCollection<Especialista>;
  referenciaBd: AngularFirestore;

  constructor(private bd: AngularFirestore,private http: HttpClient) {
    this.referenciaBd = bd;
    this.referenciaAlaColeccionPaciente = bd.collection(this.rutaDeLaColeccionPaciente);
    this.referenciaAlaColeccionEspecialista = bd.collection(this.rutaDeLaColeccionEspecialista);
  }

  CrearPaciente(paciente: Paciente): any {
    let id = this.bd.createId();
    paciente.id = id;
    return this.referenciaAlaColeccionPaciente.add({ ...paciente });
  }

  CrearEspecialista(especialista: Especialista): any {
    let id = this.bd.createId();
    especialista.id = id;
    return this.referenciaAlaColeccionEspecialista.add({ ...especialista });
  }



  public TraerTodosPacientes() {
    return this.referenciaAlaColeccionPaciente;
  }

  public TraerTodosEspecialistas() {
    return this.referenciaAlaColeccionEspecialista;
  }


 public BuscarUsuarioEsp(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionEspecialista, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  } 

  public BuscarUsuario(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionEspecialista, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  } 

  public BuscarUsuarioPac(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionPaciente, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  } 


}