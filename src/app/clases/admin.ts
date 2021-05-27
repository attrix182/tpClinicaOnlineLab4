export class Admin {
    id: any;
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    edad: number;
    dni: number;
    foto1: any;
    perfil: string;

    constructor(nombre, apellido, correo, clave, edad, dni, foto1, perfil) {

        this.nombre = nombre;
        this.correo = correo;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.clave = clave;
        this.foto1 = foto1;
        this.perfil = perfil;



    }
}
