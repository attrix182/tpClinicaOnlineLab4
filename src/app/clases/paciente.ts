export class Paciente {
    id: any;
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    edad:number;
    dni:number;
    obraSocial:string;
    foto1: any;
    foto2: any;
    perfil:string;

    constructor(nombre, apellido, correo, clave, edad, dni, obraSocial, foto1, foto2, perfil) {

        this.nombre = nombre;
        this.correo = correo;
        this.apellido = apellido;
        this.edad = edad;
        this.dni =dni;
        this.obraSocial =obraSocial;
        this.clave = clave;
        this.foto1 = foto1;
        this.foto2 = foto2;
        this.perfil = perfil;



    }
}