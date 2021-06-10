
import { HistoriaClinica } from './../../../clases/historia-clinica';
import { Especialista } from './../../../clases/especialista';
import { UsuarioService } from './../../../servicios/usuario.service';
import { Turno } from './../../../clases/turno';
import { MisTurnosService } from './../../../servicios/mis-turnos.service';
import { MisturnosModule } from './../../../modules/misturnos/misturnos.module';
import {
  Component, ElementRef, OnInit,
  Pipe,
  PipeTransform,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/clases/admin';
import { Paciente } from 'src/app/clases/paciente';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';



@Component({
  selector: 'app-gestionar-turnos',
  templateUrl: './gestionar-turnos.component.html',
  styleUrls: ['./gestionar-turnos.component.scss'],
})
export class GestionarTurnosComponent implements OnInit {
  public turnos: any[] = [];

  public misTurnos: any[] = [];

  usuarios: Observable<any[]>;
  public listaEspecialidades: any[] = [];
  public listaUsuarios: any[] = [];
  public listaAdministradores: Admin[] = [];
  public listaEspecialistas: Especialista[] = [];
  public listaPacientes: Paciente[] = [];
  public listaTurnosEspecialista: Turno[] = [];
  public especialistaActivo: Especialista;
  public comentario: string;
  public turnoModificado: Turno;
  public historiaClinica: HistoriaClinica;
  public searchParam: string = "";

  public turnoSeleccionado: any;

  public datosExtra: any[] = [];

  public dato: any;

  public valor: any;

  formularioComentario: FormGroup;

  formularioHistoriaClinica: FormGroup;

  formularioHistoriaClinicaDatos: FormGroup;


  closeResult: string;

  public datos: any;

  @ViewChild('modalRechazar', { read: TemplateRef }) modalRechazar: TemplateRef<any>;

  @ViewChild('modalCancelar', { read: TemplateRef })
  modalCancelar: TemplateRef<any>;

  @ViewChild('modalFinalizar', { read: TemplateRef })
  modalFinalizar: TemplateRef<any>;

  @ViewChild('modalVerComentario', { read: TemplateRef })
  modalVerComentario: TemplateRef<any>;


  constructor(
    private turnosSVC: MisTurnosService,
    private authSvc: AuthService,
    private context: AngularFireDatabase,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private vref: ViewContainerRef
  ) {
    this.formularioComentario = formBuilder.group({
      comentario: new FormControl(''),
    });

    this.formularioHistoriaClinica = formBuilder.group({
      peso: new FormControl(''),
      temperatura: new FormControl(''),
      presion: new FormControl(''),
      comentario: new FormControl(''),
      dato: new FormControl(''),
      valor: new FormControl(''),
    });

    this.formularioHistoriaClinicaDatos
      = formBuilder.group({
        dato: new FormControl(''),
        valor: new FormControl(''),
      });

    this.historiaClinica = new HistoriaClinica();

    this.turnoSeleccionado = new Turno();

    turnosSVC
      .TraerTurnos()
      .valueChanges()
      .subscribe((data) => {
        this.turnos = data;
        console.log(data)//sacar
        this.turnosEspecialistaActivo();

      });
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

  public cargarListas() {
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

  turnosEspecialistaActivo() {
    this.misTurnos.splice(0);

    this.turnos.forEach((unTurno: any) => {
      if (unTurno.especialista.id == this.especialistaActivo.id) {

        if (unTurno.estado == 'rechazado') {
          unTurno.claseCard = 'card text-dark bg-danger';
        }

        if (unTurno.estado == 'cancelado') {
          unTurno.claseCard = 'card text-dark bg-danger';
        }

        if (unTurno.estado == 'pendiente') {
          unTurno.claseCard = 'card text-dark bg-warning';
        }

        if (unTurno.estado == 'aceptado') {
          unTurno.claseCard = 'card text-dark bg-info';
        }

        if (unTurno.estado == 'finalizado') {
          unTurno.claseCard = 'card text-dark bg-success';
        }

        this.misTurnos.push(unTurno);

      }
    });

    this.listaTurnosEspecialista = this.misTurnos;
  }

  hacerBusqueda(){

    if(this.searchParam === ""){
      this.misTurnos = this.listaTurnosEspecialista;
      return;
    }

    const serachParamLower = this.searchParam.toLowerCase();
    this.misTurnos = this.listaTurnosEspecialista.filter(turno => this.doSearch(turno,serachParamLower));
  }

  doSearch(value,searcher){    
    if(typeof value === 'boolean'){
      return false;
    }

    if(typeof value === 'object'){
      for(let fieldKey in value){        
        if(!this.estaEnLaListaNegraDeKeys(fieldKey) && this.doSearch(value[fieldKey],searcher)){
          return true;
        }
      }

      return false;
    }


    return (typeof value == "string" ? value.toLocaleLowerCase() : value.toString()).includes(searcher)
  }

  estaEnLaListaNegraDeKeys(key){
    return ["especialidades","foto","foto1","foto2"].indexOf(key) != -1
  }

  traerUsuario() {
    this.authSvc.GetCurrentUser().then((response) => {
      let user = this.listaEspecialistas.filter((u) => u.id == response.uid);

      this.especialistaActivo = user[0];
    });
  }

  aceptarTurno(turno: Turno) {
    this.turnosSVC.aceptar(turno);
  }

  finalizarTurno(turno: Turno) {
    this.turnoModificado = turno;
    this.modalService.open(this.modalFinalizar);
  }

  finalizarTurnoModal() {
    this.turnoModificado.comentario =
      this.formularioHistoriaClinica.value.comentario;
    this.historiaClinica.paciente = this.turnoModificado.paciente;
    this.historiaClinica.peso = this.formularioHistoriaClinica.value.peso;
    this.historiaClinica.temperatura =
      this.formularioHistoriaClinica.value.temperatura;
    this.historiaClinica.presion = this.formularioHistoriaClinica.value.presion;

    this.historiaClinica.idTurno = this.turnoModificado.key;


    this.historiaClinica.datosExtra = this.datos

    this.turnoModificado.historia = this.historiaClinica;

    this.turnosSVC.finalizar(this.turnoModificado, this.historiaClinica);
    this.modalService.dismissAll()
    this.limpiarCampos();
  }

  rechazarTurno(turno: Turno) {
    this.turnoModificado = turno;
    this.modalService.open(this.modalRechazar);
  }

  rechazarTurnoModal() {
    this.turnoModificado.comentario =
      this.formularioComentario.value.comentario;
    this.turnosSVC.rechazar(this.turnoModificado);
    this.modalService.dismissAll()
    this.limpiarCampos();
  }

  cancelarTurno(turno: Turno) {
    this.turnoModificado = turno;
    this.modalService.open(this.modalCancelar);
  }

  cancelarTurnoModal() {
    this.turnoModificado.comentario =
      this.formularioComentario.value.comentario;
    this.turnosSVC.cancelar(this.turnoModificado);
    this.modalService.dismissAll()
    this.limpiarCampos();
  }

  verComentario(turno: Turno) {
    console.log(turno.historia)
    this.turnoSeleccionado.estado = turno.estado;
    this.turnoSeleccionado.comentario = turno.comentario;
    this.turnoSeleccionado.peso = turno.historia.peso;
    this.turnoSeleccionado.temperatura = turno.historia.temperatura;
    this.turnoSeleccionado.presion = turno.historia.presion;
    this.turnoSeleccionado.datosExtra = turno.historia.datosExtra;


    
    this.modalService.open(this.modalVerComentario);

  }

  agregarDato() {


    let datoAux = this.formularioHistoriaClinicaDatos.value.dato;
    let valorAux = this.formularioHistoriaClinicaDatos.value.valor;

    if (this.datosExtra.length < 3) {
      
      this.datosExtra[datoAux] = valorAux
    }

    this.datos = this.datosExtra;

  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  limpiarCampos() {
    this.formularioComentario.reset()
    this.formularioHistoriaClinica.reset()
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else {
      return `with: ${reason}`;
    }
  }
}

