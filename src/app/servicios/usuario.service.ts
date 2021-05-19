import { AuthService } from './auth.service';
import { Especialista } from './../clases/especialista';
import { Paciente } from './../clases/paciente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore,AngularFirestoreCollection,} from '@angular/fire/firestore/';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  rutaDeLaColeccionPaciente = '/pacientes';
  rutaDeLaColeccionEspecialista = '/especialistas';
  referenciaAlaColeccionPaciente: AngularFirestoreCollection<Paciente>;
  referenciaAlaColeccionEspecialista: AngularFirestoreCollection<Especialista>;
  referenciaBd: AngularFirestore;

  constructor(private bd: AngularFirestore,private http: HttpClient, private authSvc:AuthService, private context: AngularFireDatabase) {
    this.referenciaBd = bd;
    this.referenciaAlaColeccionPaciente = bd.collection(this.rutaDeLaColeccionPaciente);
    this.referenciaAlaColeccionEspecialista = bd.collection(this.rutaDeLaColeccionEspecialista);
  }

  CrearPaciente(paciente: Paciente): any {
    
    let id = this.bd.createId();
    paciente.id = id;
    return this.referenciaAlaColeccionPaciente.add({ ...paciente });
  }


  
  RegistrarEspecialista(especialista) {

    this.authSvc.GetCurrentUser().then((response: any) => {

      this.context.list('usuarios').set(response.uid,
        {
          correo: especialista.correo,
          nombre: especialista.nombre,
          apellido: especialista.apellido,
          especialidades: especialista.especialidades,
          edad:especialista.edad,
          dni:especialista.dni,
          id: response.uid,
          foto: especialista.foto,
          perfil: "especialista"
        });


    });

    this.authSvc.LogOutCurrentUser();
  }


    
  RegistrarPaciente(paciente) {

    this.authSvc.GetCurrentUser().then((response: any) => {

      this.context.list('usuarios').set(response.uid,
        {

          nombre: paciente.nombre,
          apellido: paciente.apellido,
          correo: paciente.correo,
          edad:paciente.edad,
          dni:paciente.dni,
          obraSocial: paciente.obraSocial,
          id: response.uid,
          foto1 : paciente.foto1,
          foto2: paciente.foto2,
          perfil: "paciente"
        });


    });

    this.authSvc.LogOutCurrentUser();
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