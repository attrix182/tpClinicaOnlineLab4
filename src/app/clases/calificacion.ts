import { Especialista } from './especialista';
import { Paciente } from './paciente';

export class Calificacion {
    paciente: Paciente;
    especialista: Especialista;
    estrellas: number;
  }