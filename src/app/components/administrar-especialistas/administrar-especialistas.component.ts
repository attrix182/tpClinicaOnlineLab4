import { Especialidad } from './../../clases/especialidad';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-administrar-especialistas',
  templateUrl: './administrar-especialistas.component.html',
  styleUrls: ['./administrar-especialistas.component.scss'],
})
export class AdministrarEspecialistasComponent implements OnInit {
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  foto: any;

  constructor(
    private context: AngularFireDatabase,
    private storage: AngularFireStorage,
    private userSrv: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(
      (usuarios) => {
        this.listadoUsuarios = usuarios;
      },
      (error) => console.log(error)
    );
  }

  mostrarFoto(path: string) {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(path);

    console.log(path);

    return spaceRef.getDownloadURL();
  }

  cambiarEstado(esp) {
    this.userSrv.activarEspecialista(esp);

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
