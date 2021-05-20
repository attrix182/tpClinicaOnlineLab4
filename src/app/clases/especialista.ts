
export class Especialista {

    id:any;
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    edad:number;
    dni:number;
    foto: any;
    especialidades: string;
    perfil:string;
    estado:boolean;

   
    constructor(nombre, apellido, correo, clave, edad, dni, foto, especialidades, perfil, estado) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.clave = clave;
        this.edad = edad;
        this.dni =dni;
        this.foto = foto;
        this.especialidades = especialidades;
        this.perfil = perfil;
        this.estado = estado;

    }

}