import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from '../../clases/especialista';
import { Paciente } from './../../clases/paciente';

import { UsuarioService } from './../../servicios/usuario.service';

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

  private isEmail =/\S+@\S+\.\S+/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuarioService
  ) {
    this.unPaciente = new Paciente();

    this.tipo = 'paciente'
  }

  ngOnInit(): void {
    this.initForm();
  }


  onRegisterPaciente() {
    if (this.pacienteRegForm.valid) {


      this.unPaciente.nombre = this.pacienteRegForm.value.nombre;
      this.unPaciente.apellido = this.pacienteRegForm.value.apellido;
      this.unPaciente.correo = this.pacienteRegForm.value.email;
      this.unPaciente.clave = this.pacienteRegForm.value.clave;
  

      this.usuarioSrv.Crear(this.unPaciente);
      this.usuarioSrv
        .BuscarUsuario(this.unPaciente)
        .valueChanges()
        .subscribe((result) => {
          if (result.length == 1) {
            console.log('ERROR usuario ya registrado');
          } else {
            localStorage.setItem('token', this.unPaciente.correo);
            this.usuarioSrv.Crear(this.unPaciente);
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
      this.unEspecialista.correo = this.especialistaRegForm.value.email;
      this.unEspecialista.clave = this.especialistaRegForm.value.clave;
      this.unEspecialista.edad = this.especialistaRegForm.value.edad;
      this.unEspecialista.dni = this.especialistaRegForm.value.dni;


      this.usuarioSrv.Crear(this.unPaciente);
      this.usuarioSrv
        .BuscarUsuario(this.unPaciente)
        .valueChanges()
        .subscribe((result) => {
          if (result.length == 1) {
            console.log('ERROR usuario ya registrado');
          } else {
            localStorage.setItem('token', this.unPaciente.correo);
            this.usuarioSrv.Crear(this.unPaciente);
            this.router.navigateByUrl('home');
            console.log('Usuario registrado!');
          }
        });
      
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