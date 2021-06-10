import { Especialista } from './especialista';
import { Paciente } from './paciente';

export class Encuesta {
    paciente: Paciente;
    especialista: Especialista;
    atencionDelEspecialista:string;
    recomienda:any;
    sugerencias:string;
  }