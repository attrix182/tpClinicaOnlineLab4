import { Calificacion } from './../clases/calificacion';
import { HistoriaClinica } from './../clases/historia-clinica';
import { Turno } from './../clases/turno';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root',
})
export class MisTurnosService {
  rutaDeLaColeccionTurnos = '/turnos';

  rutaDeLaHistoriasClinicas = '/historiasClinicas';

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
    this.db
      .collection('historiasClinicas')
      .doc(historia.paciente.nombre + historia.idTurno)
      .set({
        paciente: historia.paciente,
        peso: historia.peso,
        presion: historia.presion,
        temperatura: historia.temperatura,
        datosExtra: Object.assign({}, historia.datosExtra),
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
        encuestaCompletada: false,
        key: turno.paciente.nombre + hoy.getTime().toString(),
      });
  }

  marcarEncuestaCompletada(turno: Turno) {

    turno.encuestaCompletada = true;

    this.db.collection('turnos').doc(turno.key).update({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
      comentario: turno.comentario || "",
      key: turno.key,
      encuestaCompletada: turno.encuestaCompletada
    });
  }


  marcarCalificaciomCompletada(turno: Turno) {

    turno.calificacionCompletada = true;

    this.db.collection('turnos').doc(turno.key).update({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
      comentario: turno.comentario || "",
      key: turno.key,
      encuestaCompletada: turno.encuestaCompletada,
      calificacionCompletada: turno.calificacionCompletada
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
      encuestaCompletada: turno.encuestaCompletada,
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
      encuestaCompletada: turno.encuestaCompletada,
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
      encuestaCompletada: turno.encuestaCompletada,
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
      historia: Object.assign({}, historia),
      encuestaCompletada: turno.encuestaCompletada,
      key: turno.key,
    });
  }



  TraerTurnos(): AngularFirestoreCollection<Turno> {
    return this.referenciaAlaColeccionTurnos;
  }

  TraerHistorias(): AngularFirestoreCollection<HistoriaClinica> {
    return this.referenciaHistoriasClinicas;
  }



  TraerHistoriaPorId(id) {

    return new Promise(resolve => {

      this.referenciaHistoriasClinicas.doc(id).snapshotChanges().subscribe((data) => {

        resolve(data.payload.data())

      });

    })

  }

  agregarCalificacion(cali: Calificacion) {
    let hoy = new Date();

    this.db
      .collection('calificaciones')
      .doc(cali.paciente.nombre + hoy.getTime().toString())
      .set({
        paciente: cali.paciente,
        especialista: cali.especialista,
        estrellas: cali.estrellas,
        key: cali.paciente.nombre + hoy.getTime().toString(),
      });
  }

  agregarEncuesta(encu: Encuesta) {
    console.log('en el svc');

    let hoy = new Date();

    this.db
      .collection('encuestas')
      .doc(encu.paciente.nombre + hoy.getTime().toString())
      .set({
        paciente: encu.paciente,
        especialista: encu.especialista,
        atencionDelEspecialista: encu.atencionDelEspecialista,
        recomendaria: encu.recomienda,
        sugerencias: encu.sugerencias,
        key: encu.paciente.nombre + hoy.getTime().toString(),
      });
  }




}
