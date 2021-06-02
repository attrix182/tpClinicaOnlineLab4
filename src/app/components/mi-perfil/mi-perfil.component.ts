import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Horario } from 'src/app/clases/horario';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {
  usuarios: Observable<any[]>;

  listadoUsuarios: any[] = [];

  public usuarioActivo;

  public timer;

  public misHorarios;

  public listaEspecialidades: any[] = [];

  public listaEspecialidadesDelEspecialista: any[] = [];

  public especialidadActiva: any;

  public horario: Horario;

  public dias: any[] = [];

  public rangoHorario;

  constructor(
    private authSVC: AuthService,
    private userSVC: UsuarioService,
    private context: AngularFireDatabase
  ) {
    this.misHorarios = false;

    this.especialidadActiva = false;

    this.horario = new Horario('', '', '', '');

    userSVC
      .TraerEspecialidades()
      .valueChanges()
      .subscribe((data) => {
        this.listaEspecialidades = data;
        this.filtrarEspecialidades();
      });
  }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(
      (usuarios) => {
        this.listadoUsuarios = usuarios;
        this.traerUsuario();
      },
      (error) => console.log(error)
    );
    this.tempo();
  }

  tempo() {
    setTimeout(() => {
      this.timer = true;
    }, 1000);
  }

  filtrarEspecialidades() {
    this.listaEspecialidades.forEach((esp) => {
      setTimeout(() => {
        let espActiva = this.usuarioActivo.especialidades;

        espActiva.forEach((espAct) => {
          if (esp.nombre == espAct) {
            this.listaEspecialidadesDelEspecialista.push(esp);
          }
        });
      }, 2000);
    });
  }

  verHorarios() {

    this.horario.especialista = this.usuarioActivo

    if (this.misHorarios) {
      this.misHorarios = false;
    } else {
      this.misHorarios = true;
    }
  }

  traerUsuario() {
    this.authSVC.GetCurrentUser().then((response) => {
      let user = this.listadoUsuarios.filter((u) => u.id == response.uid);

      this.usuarioActivo = user[0];
    });
  }

  especialidadSeleccionada(esp) {
   
    this.especialidadActiva = esp;

    this.horario.especialidad =esp;
  }

  agregarQuitarDia(unDia: string) {
    let encontro = false;

    this.dias.forEach((element) => {
      if (element == unDia) {
        let index = this.dias.indexOf(unDia);
        this.dias.splice(index, 1);

        encontro = true;
      }
    });

    if (!encontro) {
      this.dias.push(unDia);

      this.horario.dia = this.dias;
      console.log(this.horario);
    }
  }

  agregarQuitarHorario(horas: string) {
    this.rangoHorario = '';

    switch (horas) {
      case 'todoElDia':
        this.rangoHorario = '08:00 19:00';

        this.horario.rangoHorario = this.rangoHorario;
        console.log(this.horario);
        break;
      case 'soloManana':
        this.rangoHorario = '08:00 12:00';
        this.horario.rangoHorario = this.rangoHorario;
        console.log(this.horario);
        break;
      case 'soloTarde':
        this.rangoHorario = '12:00 16:00';
        this.horario.rangoHorario = this.rangoHorario;
        console.log(this.horario);
        break;
      case 'tardeNoche':
        this.rangoHorario = '16:00 19:00';
        this.horario.rangoHorario = this.rangoHorario;
        console.log(this.horario);
        break;

      default:
        break;
    }
  }
}
