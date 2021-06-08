import { HistoriaClinica } from './historia-clinica';
import { Especialista } from './especialista';
import { Especialidad } from './especialidad';
import { Paciente } from './paciente';
export class Turno {

    key:string;
    paciente:Paciente;
    especialista:Especialista;
    fecha:any;
    especialidad:Especialidad;
    estado:string;
    comentario:string; //paciente
    historia:any; 


}
