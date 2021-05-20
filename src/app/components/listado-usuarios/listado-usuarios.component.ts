import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  foto: any;

  constructor(private context: AngularFireDatabase, private storage: AngularFireStorage) { }


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


    spaceRef.getDownloadURL().then(url => {
      console.log(url)
      this.foto = url
      return url;

    });
  }





}
