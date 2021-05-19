import { Especialista } from './../../clases/especialista';
import { AuthService } from './../../servicios/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from './../../clases/paciente';

import { UsuarioService } from './../../servicios/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  pacienteRegForm: FormGroup;

  especialistaRegForm: FormGroup;

  public unPaciente: Paciente;
  public unEspecialista: Especialista;
  public tipo: string;
  public pathFoto: any;
  public pathFoto2: any;

  id: any;
  foto: any;
  foto1: any;
  foto2: any;
  fotoCargada1: any;
  fotoCargada2: any;

  correo: string;
  clave: string;

  nombre: string;
  apellido: string;

  dni: number;
  edad: number;
  obraSocial: string;

  especialidades: any;


  private isEmail = /\S+@\S+\.\S+/;



  @Output() emitRegister: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuarioService,
    private storage: AngularFireStorage,
    private authSVC: AuthService
  ) {

    this.tipo = 'paciente'
  }

  ngOnInit(): void {
    this.initForm();
  }


  Limpiar() {
    this.pacienteRegForm.value.nombre = null;
    this.pacienteRegForm.value.correo = null;
    this.pacienteRegForm.value.apellido = null;
    this.pacienteRegForm.value.clave = null;
    (<HTMLInputElement>document.getElementById("foto1")).value = "";
    (<HTMLInputElement>document.getElementById("foto2")).value = "";

    this.especialidades = null;
  }


  CambioFotos(e, numero) {
    if (numero == 1) {
      this.foto1 = e.target.files[0];
      console.log(this.foto1);
    } else {
      this.foto2 = e.target.files[0];
      console.log(this.foto2);
    }
  }

  SubirFotos(id: string) {
    if (this.foto1) {
      this.fotoCargada1 = `/usuarios/${id}/${1}`;
      this.storage.upload(this.fotoCargada1, this.foto1);
      this.guardarReferenciaUno(this.fotoCargada1);
    } else {
      this.fotoCargada1 = `/usuarios/foto1.png`;
    }

    if (this.foto2) {
      this.fotoCargada2 = `/usuarios/${id}/${2}`;
      this.storage.upload(this.fotoCargada2, this.foto2);
      this.guardarReferenciaDos(this.fotoCargada2);
    } else {
      this.fotoCargada2 = `/usuarios/foto2.png`;
    }
  }

  guardarReferenciaUno(pReferencia: string) {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(pReferencia);
    spaceRef.getDownloadURL().then(url => {
      this.pathFoto = url
    });
  }


  guardarReferenciaDos(pReferencia: string) {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(pReferencia);
    spaceRef.getDownloadURL().then(url => {
      this.pathFoto2 = url
    });
  }



  onRegisterPaciente() {
    if (this.pacienteRegForm.valid) {


      this.nombre = this.pacienteRegForm.value.nombre;
      this.apellido = this.pacienteRegForm.value.apellido;
      this.correo = this.pacienteRegForm.value.correo;
      this.clave = this.pacienteRegForm.value.clave;
      this.dni = this.pacienteRegForm.value.dni;
      this.edad = this.pacienteRegForm.value.edad;
      this.obraSocial = this.pacienteRegForm.value.obraSocial;
      this.foto1 = this.fotoCargada1;
      this.foto2 = this.fotoCargada2;
      this.registrarPaciente();
    }
  }



  onRegisterEspecialista() {
    if (this.especialistaRegForm.valid) {


      this.nombre = this.especialistaRegForm.value.nombre;
      this.apellido = this.especialistaRegForm.value.apellido;
      this.correo = this.especialistaRegForm.value.correo;
      this.clave = this.especialistaRegForm.value.clave;
      this.edad = this.especialistaRegForm.value.edad;
      this.dni = this.especialistaRegForm.value.dni;
      this.especialidades = this.especialistaRegForm.value.especialidades;
      this.foto = this.fotoCargada1;

      console.log(this.pathFoto)
      this.registrarEspecialista();
    }
  }




  registrarPaciente() {


    this.authSVC.Register(this.correo, this.clave).then(response => {

      this.SubirFotos(response.user.uid);

      this.id = response.user.uid;

      let paciente = new Paciente(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.obraSocial, this.pathFoto, this.pathFoto2, 'paciente');
      this.usuarioSrv.RegistrarPaciente(paciente);

    }).catch(error => { console.log(error); });


  }


  registrarEspecialista() {


    this.authSVC.Register(this.correo, this.clave).then(response => {

      this.SubirFotos(response.user.uid);

      this.id = response.user.uid;
      let especialista = new Especialista(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.pathFoto, this.especialidades, 'especialista');
      this.usuarioSrv.RegistrarEspecialista(especialista);


    }).catch(error => { console.log(error); });

  }


  isValidPaciente(field: string): string {
    const validateField = this.pacienteRegForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }


  isValidEspecialista(field: string): string {
    const validateField = this.especialistaRegForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.pacienteRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      obraSocial: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]]
    });


    this.especialistaRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      especialidades: ['', [Validators.required]]
    });
  }




  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
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