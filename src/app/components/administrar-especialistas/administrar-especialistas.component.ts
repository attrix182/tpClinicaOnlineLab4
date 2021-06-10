import { Especialidad } from './../../clases/especialidad';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import * as firebase from 'firebase';
import { Especialista } from 'src/app/clases/especialista';

@Component({
  selector: 'app-administrar-especialistas',
  templateUrl: './administrar-especialistas.component.html',
  styleUrls: ['./administrar-especialistas.component.scss'],
})
export class AdministrarEspecialistasComponent implements OnInit {
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  foto: any;
  public listaEspecialistas: Especialista[] = [];

  public estado;

  constructor(
    private context: AngularFireDatabase,
    private storage: AngularFireStorage,
    private userSrv: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(
      (usuarios) => {
        this.listadoUsuarios = usuarios;
        this.cargarListas();
      },
      (error) => console.log(error)
    );
  }


  public cargarListas() {
    this.listadoUsuarios.forEach((usuario) => {
      let perfil = usuario.perfil;

      console.log(perfil);

      if (perfil == 'especialista') {
        this.listaEspecialistas.push(usuario);
      }
    });
  }

  vaciarLista() {
    this.listaEspecialistas.splice(0);
  }



  cambiarEstado(esp) {
    this.vaciarLista();



    this.estado = this.userSrv.activarEspecialista(esp);



    let nuevaEspecialidad: Especialidad = new Especialidad('', '');

    if (esp.especialidades.length > 0) {
      esp.especialidades.forEach((esp) => {
        console.log(esp);

        nuevaEspecialidad.nombre = esp;
        nuevaEspecialidad.estado = true;

        this.userSrv.AgregarEspecialidad(nuevaEspecialidad);
      });
    } else {
      this.userSrv.AgregarEspecialidad(nuevaEspecialidad);
    }
  }
}
