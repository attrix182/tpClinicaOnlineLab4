import { MisTurnosService } from './../../../servicios/mis-turnos.service';
import { Paciente } from './../../../clases/paciente';
import { AuthService } from './../../../servicios/auth.service';
import { Turno } from './../../../clases/turno';
import { Horario } from 'src/app/clases/horario';
import { MisHorariosService } from './../../../servicios/mis-horarios.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { Especialidad } from './../../../clases/especialidad';
import { Especialista } from './../../../clases/especialista';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Admin } from 'src/app/clases/admin';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  listaEspecialistaPorEspecialidad: Especialista[] = [];
  public listaEspecialistasConEspecialidad: any[] = [];

  public especialistaSeleccionado;

  public especialidadSeleccionada;

  public horariosDeLosEspecialistas: Horario[] = [];

  public horarioDelEspecialista: Horario;

  public listaTurnos = [];

  public turnoSeleccionado: Turno;

  public pacienteActivo: Paciente;

  public turnosDados: Turno[] = [];

  public especialistasConEspecialidades: boolean;

  public misTurnos: boolean;

  public verTurnos: boolean;

  public turnoSugerido: Turno = new Turno();

  constructor(private userSvc: UsuarioService, private context: AngularFireDatabase, private horariosSVC: MisHorariosService, private authSvc: AuthService, private turnosSVC: MisTurnosService) {

    this.filtroEspecialidades = false;

    this.turnoSeleccionado = new Turno();

    this.especialistasConEspecialidades = false;


    userSvc
      .TraerEspecialidades()
      .valueChanges()
      .subscribe((data) => {
        this.listaEspecialidades = data;
      });

    horariosSVC
      .TraerHorarios()
      .valueChanges()
      .subscribe((data) => {
        this.horariosDeLosEspecialistas = data;
      });

    turnosSVC
      .TraerTurnos()
      .valueChanges()
      .subscribe((data) => {
        this.turnosDados = data;
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

  atras() {
    this.filtroEspecialidades = true;
    this.filtroEspecialistas = false;
    this.especialistaSeleccionado = false;
    this.listaTurnos = []

  }

  public cargarListas() {

    this.listaEspecialistas = []
    this.listaUsuarios.forEach((usuario) => {
      this.traerUsuario();
      let perfil = usuario.perfil;

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

  especilidadesListar() {
    if (this.filtroEspecialidades) {
      this.filtroEspecialidades = false;
    }
    else {
      this.especialistasConEspecialidades = false;
      this.verTurnos = false;
      this.filtroEspecialistas = false;
      this.filtroEspecialidades = true;
    }
  }



  especilistasListar() {
    if (this.especialistasConEspecialidades) {
      this.especialistasConEspecialidades = false;
    }
    else {
      this.especialistasConEspecialidad();
      this.filtroEspecialidades = false;
      this.listaTurnos = [];
      this.filtroEspecialistas = false;
      this.especialistasConEspecialidades = true;
    }
  }

  misTurnosListar() {
    if (this.misTurnos) {
      this.misTurnos = false;
      this.filtroEspecialidades = false;
    }
    else {
      this.misTurnos = true;
    }

  }


  mostrarEspecialidades() {
    this.filtroEspecialidades = false;
    this.filtroEspecialistas = false;

  }

  mostrarEspecialistas() {
    this.filtroEspecialidades = false;
    this.filtroEspecialistas = true;
  }

  selccionarEspecialidad(esp: Especialidad) {
    this.listaEspecialistaPorEspecialidad.splice(0, this.listaEspecialistaPorEspecialidad.length);

    this.filtroEspecialidades = false;

    this.listaEspecialistas.forEach((doctor) => {
      doctor.especialidades.forEach((espDelDoc) => {
        if (esp.nombre == espDelDoc) {
          this.listaEspecialistaPorEspecialidad.push(doctor);
        }
      });
    });
    this.especialidadSeleccionada = esp;
    this.filtroEspecialistas = true;
  }


  especialistasConEspecialidad() {
    this.listaEspecialistasConEspecialidad = []
    //this.listaEspecialistasConEspecialidad.splice(0, this.listaEspecialistasConEspecialidad.length)
    let auxDoctor;
    this.listaEspecialistas.forEach((doctor) => {

      doctor.especialidades.forEach((espDelDoc) => {
        {
          auxDoctor = JSON.parse(JSON.stringify(doctor));
          auxDoctor.especialidades = espDelDoc;
          this.listaEspecialistasConEspecialidad.push(auxDoctor);
        }
      });
    });
  }

  selccionarEspecialista(esp: Especialista) {
    this.especialistaSeleccionado = esp;

    this.filtrarHorarios();
    this.listarTurnos();
    this.filtroEspecialistas = false;
    this.verTurnos = true;
  }

  async traerEspecialidad(especialdiad) {

    return await this.userSvc.TraerEspecialidPorId(especialdiad)
  }


  selccionarEspecialistaConEspecialidad(esp: Especialista) {
    this.especialistaSeleccionado = esp;


    this.traerEspecialidad(esp.especialidades).then(data => {
      this.especialidadSeleccionada = data;
      this.filtrarHorarios();
      this.listarTurnos();
      this.especialistasConEspecialidades = false;
    })
    this.verTurnos = true;
  }


  filtrarHorarios() {
    this.horariosDeLosEspecialistas.forEach((unHorario) => {
      if (unHorario.especialista.id == this.especialistaSeleccionado.id) {
        this.horarioDelEspecialista = unHorario;
      }
    });
  }

  listarTurnos() {
    const horarios = this.horarioDelEspecialista.especialidadHorarios[this.especialidadSeleccionada.nombre];

    if (!horarios.rangoHorario || horarios.rangoHorario.length < 1 || !horarios.dias || horarios.dias.length < 1) {
      this.alert('error', 'El especialista no tiene horarios disponibles');
      return;
    }

    let hoy = new Date();
    let dia = new Date();
    let manana = new Date();

    this.listaTurnos = [];



    let diasActivo;
    let horaEntrada;
    let horaSalida;
    let duracionTurno = 30;
    let turnoConFormato;

    diasActivo = horarios.dias;

    horaEntrada = horarios.rangoHorario[0].split(':');
    horaSalida = horarios.rangoHorario[1].split(':');

    let ultimoTurno;

    for (let contador = 1; contador <= 15; contador++) {
      if (diasActivo.indexOf(dia.getDay()) !== -1) {
        ultimoTurno = dia;

        ultimoTurno.setHours(horaSalida[0], horaSalida[1]);

        //Los sabados la clinica cierra a las 14hs
        if (dia.getDay() == 6) {
          ultimoTurno.setHours(14, 0);
        }

        ultimoTurno = new Date(ultimoTurno.getTime() - duracionTurno * 60000);

        dia.setHours(horaEntrada[0], horaEntrada[1]);

        do {
          turnoConFormato = dia.toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', });

          if (this.estaElTurnoDisponible(turnoConFormato)) {
            this.listaTurnos.push(turnoConFormato);
          }

          dia = new Date(dia.getTime() + duracionTurno * 60000);

        } while (dia <= ultimoTurno);
      }

      manana.setDate(hoy.getDate() + contador);
      dia = manana;
    }

  }

  estaElTurnoDisponible(fecha) {
    return !Boolean(this.turnosDados.filter(turno => turno.especialidad.nombre == this.especialidadSeleccionada.nombre && turno.especialista.id == this.especialistaSeleccionado.id && turno.fecha == fecha && ["aceptado", "pendiente"].indexOf(turno.estado) != -1).length);
  }

  traerUsuario() {
    this.authSvc.GetCurrentUser().then((response) => {
      let user = this.listaPacientes.filter((u) => u.id == response.uid);

      this.pacienteActivo = user[0];
    });
  }

  seleccionarTurno(turno) {
    this.turnoSeleccionado.paciente = this.pacienteActivo;
    this.turnoSeleccionado.especialista = this.especialistaSeleccionado;
    this.turnoSeleccionado.fecha = turno;
    this.turnoSeleccionado.especialidad = this.especialidadSeleccionada;
    this.turnoSeleccionado.estado = 'pendiente';

    this.turnosSVC.agregarTurno(this.turnoSeleccionado);

    this.alert('success', 'Turno reservado');


    this.filtroEspecialistas = false;
    this.filtroEspecialidades = false;
    this.listaTurnos = [];

  }


  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: text,
    });
  }
}
