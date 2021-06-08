import { HistoriaClinica } from './../clases/historia-clinica';
import { Turno } from './../clases/turno';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MisTurnosService {
  rutaDeLaColeccionTurnos = '/turnos';

  rutaDeLaHistoriasClinicas = '/historiasClinica';

  referenciaAlaColeccionTurnos: AngularFirestoreCollection<Turno>;

  referenciaHistoriasClinicas: AngularFirestoreCollection<HistoriaClinica>;

  constructor(private db: AngularFirestore) {
    this.referenciaAlaColeccionTurnos = db.collection(
      this.rutaDeLaColeccionTurnos
    );

    this.referenciaHistoriasClinicas = db.collection(
      this.rutaDeLaHistoriasClinicas
    );
  }

  agregarHistoriaClinica(historia: HistoriaClinica) {
   // console.log(historia.datosDinamicos)
    this.db
      .collection('historiasClinicas')
      .doc(historia.paciente.nombre + historia.idTurno)
      .set({
        paciente: historia.paciente,
        peso: historia.peso,
        presion: historia.presion,
        temperatura: historia.temperatura,
        datosExtra: Object.assign({}, historia.datosDinamicos),
      });
  }

  agregarTurno(turno: Turno) {
    console.log('en el svc');

    let hoy = new Date();


    this.db
      .collection('turnos')
      .doc(turno.paciente.nombre + hoy.getTime().toString())
      .set({
        paciente: turno.paciente,
        especialista: turno.especialista,
        fecha: turno.fecha,
        especialidad: turno.especialidad,
        estado: turno.estado,
        historia: "",
        key: turno.paciente.nombre + hoy.getTime().toString(),
      });
  }


  aceptar(turno: Turno) {

    turno.estado = 'aceptado';

    
    this.db.collection('turnos').doc(turno.key).update({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
      historia: turno.historia,
      key: turno.key,
    });
  }

  cancelar(turno: Turno) {

    turno.estado = 'cancelado';

    this.db.collection('turnos').doc(turno.key).update({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
      comentario: turno.comentario,
      key: turno.key,
    });
  }

  rechazar(turno: Turno) {

    turno.estado = 'rechazado';

    this.db.collection('turnos').doc(turno.key).update({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
      comentario: turno.comentario,
      key: turno.key,
    });
  }

  finalizar(turno: Turno, historia: HistoriaClinica) {

    turno.estado = 'finalizado';

    this.agregarHistoriaClinica(historia);


    this.db.collection('turnos').doc(turno.key).update({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
      comentario: turno.comentario,
      historia: Object.assign({}, turno.historia),
      key: turno.key,
    });
  }



  TraerTurnos(): AngularFirestoreCollection<Turno> {
    return this.referenciaAlaColeccionTurnos;
  }
}
