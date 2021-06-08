import { MisHorariosService } from './../../servicios/mis-horarios.service';
import { EspecialidadHorarios } from './../../clases/especialidad-horarios';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Horario } from 'src/app/clases/horario';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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

  toco1: boolean = false;
  toco2: boolean = false;
  toco3: boolean = false;
  toco4: boolean = false;
  toco5: boolean = false;
  toco6: boolean = false;

  eligio1: boolean = false;
  eligio2: boolean = false;
  eligio3: boolean = false;
  eligio4: boolean = false;

  public espH: EspecialidadHorarios;

  constructor(
    private authSVC: AuthService,
    private userSVC: UsuarioService,
    private context: AngularFireDatabase,
    private horariosSvc: MisHorariosService
  ) {
    this.misHorarios = false;

    this.especialidadActiva = false;

    this.horario = new Horario();

    this.espH = new EspecialidadHorarios();

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
    this.horario.especialista = this.usuarioActivo;

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

    this.espH = esp;

    this.horario.especialidadHorarios[this.espH.nombre] = this.espH;
    
    this.toco1 = false;
    this.toco2  = false;
    this.toco3  = false;
    this.toco4  = false;
    this.toco5  = false;
    this.toco6  = false;
  
    this.eligio1  = false;
    this.eligio2  = false;
    this.eligio3  = false;
    this.eligio4  = false;


  }

  agregarQuitarDia(unDia: number) {
    switch (unDia) {
      case 1:
        this.toco1 = !this.toco1;
        break;
      case 2:
        this.toco2 = !this.toco2;
        break;
      case 3:
        this.toco3 = !this.toco3;
        break;
      case 4:
        this.toco4 = !this.toco4;
        break;
      case 5:
        this.toco5 = !this.toco5;
        break;
      case 6:
        this.toco6 = !this.toco6;
        break;

      default:
        break;
    }

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

      this.horario.especialidadHorarios[this.espH.nombre].dias = this.dias;
      console.log(this.horario);
    }
  }

  agregarQuitarHorario(horas: string) {



    switch (horas) {
      case 'todoElDia':
        this.eligio1 = true;
        this.eligio2 = false;
        this.eligio3 = false;
        this.eligio4 = false;

        this.rangoHorario = ['08:00', '19:00'];
        this.horario.especialidadHorarios[this.espH.nombre].rangoHorario =
          this.rangoHorario;
        console.log(this.horario);
        break;
      case 'soloManana':
        this.eligio1 = false;
        this.eligio2 = true;
        this.eligio3 = false;
        this.eligio4 = false;

        this.rangoHorario = ['08:00', '12:00'];
        this.horario.especialidadHorarios[this.espH.nombre].rangoHorario =
          this.rangoHorario;
        console.log(this.horario);
        break;
      case 'soloTarde':
        this.eligio1 = false;
        this.eligio2 = false;
        this.eligio3 = true;
        this.eligio4 = false;
        this.rangoHorario = ['12:00', '16:00'];
        this.horario.especialidadHorarios[this.espH.nombre].rangoHorario =
          this.rangoHorario;
        console.log(this.horario);
        break;
      case 'tardeNoche':
        this.eligio1 = false;
        this.eligio2 = false;
        this.eligio3 = false;
        this.eligio4 = true;
        this.rangoHorario = ['19:00', '19:00'];
        this.horario.especialidadHorarios[this.espH.nombre].rangoHorario =
          this.rangoHorario;
        console.log(this.horario);
        break;

      default:
        break;
    }
  }

  agregar() {

    
    if(this.dias.length > 0 && this.rangoHorario)
    {
      console.log(this.horario)
      this.horariosSvc.AgregarHorario(this.horario);
      this.alert('success','Horarios editados correctamente')
    }
    else{
        this.alert('error','No selecciono fechas o dias')
    }


  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })
  }

}
