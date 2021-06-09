import { Especialidad } from './../clases/especialidad';
import { Admin } from './../clases/admin';
import { AuthService } from './auth.service';
import { Especialista } from './../clases/especialista';
import { Paciente } from './../clases/paciente';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore/';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  rutaDeLaColeccionPaciente = '/pacientes';
  rutaDeLaColeccionEspecialista = '/especialistas';
  rutaDeLaColeccionEspecialidades = '/especialidades';

  referenciaAlaColeccionEspecialidades: AngularFirestoreCollection<Especialidad>;
  referenciaBd: AngularFirestore;

  constructor(
    private authSvc: AuthService,
    private context: AngularFireDatabase,
    private db: AngularFirestore
  ) {
    this.referenciaAlaColeccionEspecialidades = db.collection(
      this.rutaDeLaColeccionEspecialidades
    );
  }

  RegistrarEspecialista(especialista) {
    console.log('en el srvce: ', especialista.especialidades);

    this.authSvc.GetCurrentUser().then((response: any) => {
      this.context.list('usuarios').set(response.uid, {
        id: response.uid,

        correo: especialista.correo,
        nombre: especialista.nombre,
        apellido: especialista.apellido,
        especialidades: especialista.especialidades,
        edad: especialista.edad,
        dni: especialista.dni,
        foto: especialista.foto,
        perfil: 'especialista',
        estado: especialista.estado,
      });

      this.AgregarEspecialidad(especialista.Especialidad);
    });

    this.authSvc.LogOutCurrentUser();
  }

  RegistrarPaciente(paciente) {
    this.authSvc.GetCurrentUser().then((response: any) => {
      this.context.list('usuarios').set(response.uid, {
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        correo: paciente.correo,
        edad: paciente.edad,
        dni: paciente.dni,
        obraSocial: paciente.obraSocial,
        id: response.uid,
        foto1: paciente.foto1,
        foto2: paciente.foto2,
        perfil: 'paciente',
      });
    });

    this.authSvc.LogOutCurrentUser();
  }

  activarEspecialista(especialista: Especialista) {
    var idEsp = especialista.id.toString();

    var auxEstado = especialista.estado;

    if (auxEstado) {
      auxEstado = false;
    } else {
      auxEstado = true;
    }

    this.context.list('usuarios').set(idEsp, {
      id: especialista.id,
      correo: especialista.correo,
      nombre: especialista.nombre,
      apellido: especialista.apellido,
      especialidades: especialista.especialidades,
      edad: especialista.edad,
      dni: especialista.dni,
      foto: especialista.foto,
      perfil: 'especialista',
      estado: auxEstado,
    });

    return auxEstado;
  }

  registrarAdmin(admin: Admin) {
    this.authSvc.GetCurrentUser().then((response: any) => {
      this.context.list('usuarios').set(response.uid, {
        nombre: admin.nombre,
        apellido: admin.apellido,
        correo: admin.correo,
        edad: admin.edad,
        dni: admin.dni,
        id: response.uid,
        foto1: admin.foto1,
        perfil: 'admin',
      });
    });

    this.authSvc.LogOutCurrentUser();
  }

  AgregarEspecialidad(especialidad: Especialidad) {
    this.db.collection('especialidades').doc(especialidad.nombre).update({
      nombre: especialidad.nombre,
      estado: true,
    });

    //  return this.referenciaAlaColeccionEspecialidades.add({...especialidad});
  }

  TraerEspecialidades(): AngularFirestoreCollection<Especialidad> {
    return this.referenciaAlaColeccionEspecialidades;
  }

  TraerEspecialidPorId(espId) {

    return new Promise(resolve => {

      this.referenciaAlaColeccionEspecialidades.doc(espId).snapshotChanges().subscribe((data) => {

        resolve(data.payload.data())


      });


    })

  }


  public traerUsuarioPorID(id)
  {


  }

}
