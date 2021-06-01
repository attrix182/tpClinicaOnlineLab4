import { UsuarioService } from './../../../servicios/usuario.service';
import { Especialidad } from './../../../clases/especialidad';
import { Especialista } from './../../../clases/especialista';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/clases/paciente';
import { AngularFireDatabase } from '@angular/fire/database';
import { Admin } from 'src/app/clases/admin';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss'],
})
export class SacarTurnoComponent implements OnInit {
  usuarios: Observable<any[]>;

  public filtroEspecialistas;
  public filtroEspecialidades;

  public listaEspecialidades: any[] = [];
  public listaUsuarios: any[] = [];
  public listaAdministradores: Admin[] = [];
  public listaEspecialistas: Especialista[] = [];
  public listaPacientes: Paciente[] = [];

  public listaEspecialistaPorEspecialidad: Especialista[] = [];

  constructor(
    private userSvc: UsuarioService,
    private context: AngularFireDatabase
  ) {
    userSvc
      .TraerEspecialidades()
      .valueChanges()
      .subscribe((data) => {
        this.listaEspecialidades = data;
      });
  }

  ngOnInit(): void {

    this.mostrarEspecialidades();
    this.usuarios = this.context.list('usuarios').valueChanges();

    this.usuarios.subscribe(
      (usuarios) => {
        this.listaUsuarios = usuarios;
        this.cargarListas();
      },
      (error) => console.log(error)
    );
  }


  atras(){
    this.filtroEspecialidades = true;
    this.filtroEspecialistas = false;
  }

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

  mostrarEspecialidades() {
    this.filtroEspecialidades = true;
    this.filtroEspecialistas = false;
  }

  mostrarEspecialistas() {
    this.filtroEspecialidades = false;
    this.filtroEspecialistas = true;
  }

  especialidadSeleccionada(esp: Especialidad) {

    this.listaEspecialistaPorEspecialidad.splice(0, this.listaEspecialistaPorEspecialidad.length)


    this.filtroEspecialidades = false;
    console.log('Esp elegida: ' + esp.nombre);

    this.listaEspecialistas.forEach((doctor) => {
      doctor.especialidades.forEach((espDelDoc) => {
        if (esp.nombre == espDelDoc) { this.listaEspecialistaPorEspecialidad.push(doctor); }

        
      });
    });

    this.filtroEspecialistas = true;
  }
}
