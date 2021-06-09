import { Horario } from 'src/app/clases/horario';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore/';

@Injectable({
  providedIn: 'root',
})
export class MisHorariosService {

  rutaDeLaColeccionHorarios = '/horarios';

  referenciaAlaColeccionHorarios: AngularFirestoreCollection<Horario>;

  constructor(private db: AngularFirestore) {
    this.referenciaAlaColeccionHorarios = db.collection(
      this.rutaDeLaColeccionHorarios
    );
  }

  AgregarHorario(horario: Horario) {

    console.log("en el svc")
    console.log(horario.especialidadHorarios)

    this.db.collection('horarios').doc(horario.especialista.id).set({
      id: horario.especialista.id,
      especialista: horario.especialista,
      especialidadHorarios: { ...horario.especialidadHorarios }
    });
  }

  TraerHorarios(): AngularFirestoreCollection<Horario> {

    return this.referenciaAlaColeccionHorarios;
  }

}
