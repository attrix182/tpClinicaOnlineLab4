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

  referenciaAlaColeccionTurnos: AngularFirestoreCollection<Turno>;

  constructor(private db: AngularFirestore) {
    this.referenciaAlaColeccionTurnos = db.collection(
      this.rutaDeLaColeccionTurnos
    );
  }

  agregarTurno(turno: Turno) {
    console.log('en el svc');

    this.db.collection('turnos').doc().set({
      paciente: turno.paciente,
      especialista: turno.especialista,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      estado: turno.estado,
    });
  }

  TraerTurnos(): AngularFirestoreCollection<Turno> {
    return this.referenciaAlaColeccionTurnos;
  }
}
