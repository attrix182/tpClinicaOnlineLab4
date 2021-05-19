import { enableProdMode } from '@angular/core';
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

   
    constructor(nombre, apellido, correo, clave, edad, dni, foto, especialidades, perfil) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.clave = clave;
        this.edad = edad;
        this.dni =dni;
        this.foto = foto;
        this.especialidades = especialidades;
        this.perfil = perfil;

    }

}