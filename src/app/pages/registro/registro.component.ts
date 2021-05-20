import { Especialista } from './../../clases/especialista';
import { AuthService } from './../../servicios/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Paciente } from './../../clases/paciente';

import { Location } from '@angular/common';



import { UsuarioService } from './../../servicios/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import * as firebase from 'firebase';

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

  public id: any;
  public foto1: any;
  public foto2: any;
  public fotoCargada1: any;
  public fotoCargada2: any;

  correo: string;
  clave: string;

  nombre: string;
  apellido: string;

  dni: number;
  edad: number;
  obraSocial: string;

  especialidades = [];
  especialidad: string;

  private isEmail = /\S+@\S+\.\S+/;



  @Output() emitRegister: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuarioService,
    private storage: AngularFireStorage,
    private authSVC: AuthService
  ) {

    this.tipo = 'especialista'

  }

  ngOnInit(): void {
    this.initForm();
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
      // this.foto1 = this.fotoCargada1;
      //  this.foto2 = this.fotoCargada2;
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
      this.especialidades;
      //  this.foto1 = this.fotoCargada1;

      this.registrarEspecialista();
    }
  }




  registrarPaciente() {


    this.authSVC.Register(this.correo, this.clave).then(response => {



      this.id = response.user.uid;

      if(this.foto1){
   
      const filePath = `/usuarios/${this.id}/1.png`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.foto1);

      this.fotoCargada1 = filePath;
      }
      else{
        this.fotoCargada1 = `/usuarios/default.png`;
      }

       if(this.foto2){

      const filePath2 = `/usuarios/${this.id}/2.png`;
      const ref2 = this.storage.ref(filePath2);
      const task2 = this.storage.upload(filePath2, this.foto2);

      this.fotoCargada2 = filePath2;
      }

      else{
        this.fotoCargada2 = `/usuarios/default.png`;
      }
      //  this.SubirFotosPaciente(response.user.uid);

      this.id = response.user.uid;

      let paciente = new Paciente(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.obraSocial, this.fotoCargada1, this.fotoCargada2, 'paciente');
      this.usuarioSrv.RegistrarPaciente(paciente);
      console.log(response);
    }).catch(error => { console.log(error); });


  }


  registrarEspecialista() {


    this.authSVC.Register(this.correo, this.clave).then(response => {

      //  this.SubirFotoEspecialista(response.user.uid); 

      this.id = response.user.uid;

      if(this.foto1){
      const filePath = `/usuarios/${this.id}/1.png`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.foto1);

      this.fotoCargada1 = filePath;
      }
      else{
        this.fotoCargada1 = `/usuarios/default.png`;
      }
      //this.guardarReferenciaEspecialista(filePath);

      let especialista = new Especialista(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.fotoCargada1, this.especialidades, 'especialista');
      this.usuarioSrv.RegistrarEspecialista(especialista);

    }).catch(error => { console.log(error); });

  }


  onUploadEspecialista($event) {
    console.log($event)
    this.foto1 = $event.target.files[0];


  }




  onUploadPaciente($event, num: number) {

    if (num == 1) {
      console.log($event)
      this.foto1 = $event.target.files[0];
    }

    else if (num == 2) {
      console.log($event)
      this.foto2 = $event.target.files[0];
    }
  }







  AgregarEspecialidades() {


    let auxEspecialidad = this.especialidades.filter(e => e == this.especialistaRegForm.value.especialidad);
    auxEspecialidad.length == 0 ? this.especialidades.push(this.especialistaRegForm.value.especialidad) : console.log("cargada");
    console.log(this.especialidades)
    this.especialistaRegForm.controls['especialidad'].setValue("");

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

  BorrarEspecialidades(especialidad: string) {
    let index = this.especialidades.indexOf(especialidad)
    this.especialidades.splice(index, 1)
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
      especialidades: ['', [Validators.minLength(0)]],
      especialidad: ['', [Validators.minLength(0)]]
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