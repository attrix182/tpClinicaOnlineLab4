import { Especialidad } from './especialidad';
import { Especialista } from './especialista';

export class Horario {

    id: any;
    especialista: Especialista;
    especialidad: Especialidad;
    dia:any;
    rangoHorario;





    constructor(especialista, especialidad, dia, rangoHorario) {

        this.especialista = especialista;
        this.especialidad = especialidad;
        this.dia = dia;
        this.rangoHorario = rangoHorario;

    }
}

