import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-administrar-especialistas',
  templateUrl: './administrar-especialistas.component.html',
  styleUrls: ['./administrar-especialistas.component.scss']
})
export class AdministrarEspecialistasComponent implements OnInit {

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  foto: any;

  constructor(private context: AngularFireDatabase, private storage: AngularFireStorage, private userSrv:UsuarioService) { }


  ngOnInit(): void {

    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
    }, error => console.log(error));
  }

  mostrarFoto(path: string) {

    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(path);

    console.log(path);

    return spaceRef.getDownloadURL();

  }

  cambiarEstado(esp)
  {
    console.log(esp)
    this.userSrv.activarEspecialista(esp)
  }




}