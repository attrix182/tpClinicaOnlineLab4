import { Especialista } from './especialista';
import { Especialidad } from './especialidad';
import { Paciente } from './paciente';
export class Turno {

    paciente:Paciente;
    especialista:Especialista;
    fecha:any;
    especialidad:Especialidad;
    estado:string;
    comentario:string; //paciente
    resena:string; //especialista


}
