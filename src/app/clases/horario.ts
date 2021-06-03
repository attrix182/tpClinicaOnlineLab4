import { EspecialidadHorarios } from './especialidad-horarios';
import { Especialista } from './especialista';

export class Horario {

    id: any;
    especialista: Especialista;
   // especialidadHorarios: EspecialidadHorarios;
   especialidadHorarios: Array<EspecialidadHorarios> = [];

    
}

