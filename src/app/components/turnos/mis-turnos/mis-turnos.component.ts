import { Paciente } from './../../../clases/paciente';
import { Calificacion } from './../../../clases/calificacion';
import { Turno } from './../../../clases/turno';
import { MisTurnosService } from './../../../servicios/mis-turnos.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon } from 'sweetalert2';


import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos
import {
  ElementRef,
  Pipe,
  PipeTransform,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Encuesta } from 'src/app/clases/encuesta';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {

  public turnos: any[] = [];

  public misTurnos: Turno[] = [];

  usuarios: Observable<any[]>;
  public listaEspecialidades: any[] = [];
  public listaUsuarios: any[] = [];
  public listaAdministradores: Admin[] = [];
  public listaEspecialistas: Especialista[] = [];
  public listaPacientes: Paciente[] = [];
  public pacienteActivo: Paciente;
  turnoModificado:any;
 public comentario: string;
  public formularioComentario: FormGroup;
  
  public turnoSeleccionado: any = [];
  calificacion:Calificacion = new Calificacion();

  encuesta:Encuesta = new Encuesta()

  
  estrellas = 0; 


  @ViewChild('modalCancelar', { read: TemplateRef })
  modalCancelar: TemplateRef<any>;

  
  @ViewChild('modalVerComentario', { read: TemplateRef })
  modalVerComentario: TemplateRef<any>;

  
  @ViewChild('modalCalificar', { read: TemplateRef })
  modalCalificar: TemplateRef<any>;

  @ViewChild('modalEncuesta', { read: TemplateRef })
  modalEncuesta: TemplateRef<any>;

  formularioEncuesta: FormGroup;
  

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

    this.formularioEncuesta = formBuilder.group({
      peso: new FormControl(''),
      temperatura: new FormControl(''),
      presion: new FormControl(''),
      comentario: new FormControl(''),
    });

    turnosSVC
      .TraerTurnos()
      .valueChanges()
      .subscribe((data) => {
        this.turnos = data;

        this.turnosPacienteActivo();

        console.log(this.misTurnos);
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

  turnosPacienteActivo() {
    this.misTurnos.splice(0);

    this.turnos.forEach((unTurno) => {
      if (unTurno.paciente.id == this.pacienteActivo.id) {
 
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

  }


  abrirModalCalificar(turno)
  {
    this.turnoSeleccionado = turno
    this.modalService.open(this.modalCalificar)
  }

  enviarCalificaion()
  {
    this.calificacion.estrellas = this.estrellas;
    this.calificacion.paciente = this.turnoSeleccionado.paciente;
    this.calificacion.especialista = this.turnoSeleccionado.especialista;
    this.turnosSVC.agregarCalificacion(this.calificacion)
    this.modalService.dismissAll()
  }


  
  abrirModalEncuesta(turno)
  {
    this.turnoSeleccionado = turno
    this.modalService.open(this.modalEncuesta)
  }

  enviarEncuesta()
  {

    this.encuesta.paciente = this.turnoSeleccionado.paciente;
    this.encuesta.especialista = this.turnoSeleccionado.especialista;
    this.turnosSVC.agregarEncuesta(this.encuesta)
    this.modalService.dismissAll()
  }


  traerUsuario() {
    this.authSvc.GetCurrentUser().then((response) => {
      let user = this.listaPacientes.filter((u) => u.id == response.uid);

      this.pacienteActivo = user[0];
    });
  }

  verComentario(turno) {
    console.log(turno)
    this.turnoSeleccionado.estado = turno.estado;
    this.turnoSeleccionado.comentario = turno.comentario;
    this.turnoSeleccionado.peso = turno.historia.peso;
    this.turnoSeleccionado.temperatura = turno.historia.temperatura;
    this.turnoSeleccionado.presion = turno.historia.presion;
    this.turnoSeleccionado.datosExtra = turno.historia.datosExtra;


    
    this.modalService.open(this.modalVerComentario);

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

  cancelarTurno(turno: Turno) {
    this.turnoModificado = turno;
    this.modalService.open(this.modalCancelar);
  }

  cancelarTurnoModal() {
    this.turnoModificado.comentario =this.formularioComentario.value.comentario;
    this.turnosSVC.cancelar(this.turnoModificado);
    this.modalService.dismissAll()

  }

  imprimirPdf(): void {
    const DATA = document.getElementById('tablaTurnos');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 1,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_turnos.pdf`);
      });
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
