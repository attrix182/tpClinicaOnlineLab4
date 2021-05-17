import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from '../../clases/especialista';
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

  private isEmail =/\S+@\S+\.\S+/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuarioService,
    private storage:AngularFireStorage
  ) {
    this.unPaciente = new Paciente();

    this.unEspecialista = new Especialista();

    this.tipo = 'paciente'
  }

  ngOnInit(): void {
    this.initForm();
  }

  guardarReferencia(pReferencia: string) {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(pReferencia);
    spaceRef.getDownloadURL().then(url => {
      this.pathFoto = url
    });
  }

  onUpload($event) {
    console.log($event)
    const file = $event.target.files[0];
    const filePath = 'upload/' + (this.unEspecialista.dni).toString();
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.guardarReferencia(filePath);
    
  }

  onRegisterPaciente() {
    if (this.pacienteRegForm.valid) {


      this.unPaciente.nombre = this.pacienteRegForm.value.nombre;
      this.unPaciente.apellido = this.pacienteRegForm.value.apellido;
      this.unPaciente.correo = this.pacienteRegForm.value.correo;
      this.unPaciente.clave = this.pacienteRegForm.value.clave;
    
  


      this.usuarioSrv.CrearPaciente(this.unPaciente);
      this.usuarioSrv
        .BuscarUsuarioPac(this.unPaciente)
        .valueChanges()
        .subscribe((result) => {
          if (result.length == 1) {
            console.log('ERROR usuario ya registrado');
          } else {
            localStorage.setItem('token', this.unPaciente.correo);
            this.usuarioSrv.CrearPaciente(this.unPaciente);
            this.router.navigateByUrl('home');
            console.log('Usuario registrado!');
          }
        });
      
    }
  }


  
  onRegisterEspecialista() {
    if (this.especialistaRegForm.valid) {


      this.unEspecialista.nombre = this.especialistaRegForm.value.nombre;
      this.unEspecialista.apellido = this.especialistaRegForm.value.apellido;
      this.unEspecialista.correo = this.especialistaRegForm.value.correo;
      this.unEspecialista.clave = this.especialistaRegForm.value.clave;
      this.unEspecialista.edad = this.especialistaRegForm.value.edad;
      this.unEspecialista.dni = this.especialistaRegForm.value.dni;
      this.unEspecialista.foto1 = `${this.pathFoto}`;

      console.log(this.pathFoto)


      this.usuarioSrv.CrearEspecialista(this.unEspecialista);
      
      
    }
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
      foto1: ['', [Validators.required]],
      foto2: ['', [Validators.required]]
    });


    this.especialistaRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
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