import { Admin } from './../../clases/admin';
import { Paciente } from './../../clases/paciente';
import { Especialista } from './../../clases/especialista';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: Observable<any[]>;

  public listaUsuarios: any[] = [];

  public listaAdministradores: Admin[] = [];
  public listaEspecialistas: Especialista[] = [];
  public listaPacientes: Paciente[] = [];

  public listarEsp: any;
  public listarAdm: any;
  public listarPac: any;

  constructor(private context: AngularFireDatabase) {}

  public cargarListas() {
    this.listaUsuarios.forEach((usuario) => {
      let perfil = usuario.perfil;

      console.log(perfil);

      switch (perfil) {
        case 'admin':
          this.listaAdministradores.push(usuario);
          break;
        case 'especialista':
          this.listaEspecialistas.push(usuario);
          break;
        case 'paciente':
          this.listaPacientes.push(usuario);
          break;
      }
    });
  }



  listarPacientes(){
    this.listarPac=true
    this.listarEsp=false
    this.listarAdm=false
  }
  listarEspecialistas(){
    this.listarPac=false
    this.listarEsp=true
    this.listarAdm=false
  }
  listarAdministradores(){
    this.listarPac=false
    this.listarEsp=false
    this.listarAdm=true
  }


  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();

    this.usuarios.subscribe(
      (usuarios) => {
        this.listaUsuarios = usuarios;
        this.cargarListas();
      },
      (error) => console.log(error)
    );
  }
}
