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

  estado: boolean;

  auxEsp = [];

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
    this.estado = false;
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
      this.pacienteRegForm.reset();

      setTimeout(() => {
        this.alert('success', 'Registro exitoso, recuerde validar su correo');
      }, 800);
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
      this.especialistaRegForm.reset();
      this.especialidades = []

      setTimeout(() => {
        this.alert('success', 'Registro exitoso, recuerde validar su correo');
      }, 800);

    }
  }




  registrarPaciente() {


    this.authSVC.Register(this.correo, this.clave).then(response => {



      this.id = response.user.uid;

      if (this.foto1) {

        const filePath = `/usuarios/${this.id}/1.png`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.foto1);



        ///prueba

        const filePath2 = `/usuarios/${this.id}/2.png`;
        const ref2 = this.storage.ref(filePath2);
        const task2 = this.storage.upload(filePath2, this.foto2);

        setTimeout(() => {

          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filePath);


          //preuba

          let storages2 = firebase.default.storage();
          let storageRef2 = storages.ref();
          let spaceRef2 = storageRef.child(filePath2);

          spaceRef.getDownloadURL().then(url => {

            
       

            this.fotoCargada2 = url
            this.fotoCargada2 = `${this.fotoCargada2}`

            console.log(this.fotoCargada2)

            this.fotoCargada1 = url
            this.fotoCargada1 = `${this.fotoCargada1}`

            console.log(this.fotoCargada1)

            let paciente = new Paciente(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.obraSocial, this.fotoCargada1, this.fotoCargada2, 'paciente');
            this.usuarioSrv.RegistrarPaciente(paciente);

        
          });

        }, 2000);

      }
      else {
        this.fotoCargada1 = `https://firebasestorage.googleapis.com/v0/b/clinicaonlinetp.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=79d91b85-41bf-4dcd-b3ae-0795bf8bfea8`;

      }



    }).catch(error => { console.log(error); });


  }


  AgregarEspecialidades() {

 
     if (this.especialistaRegForm.value.especialidad == "") {
      this.alert('error', 'No eligio ninguna especialidad')
    }
    else {

      let auxEspecialidad = this.especialidades.filter(e => e == this.especialistaRegForm.value.especialidad);
      auxEspecialidad.length == 0 ? this.especialidades.push(this.especialistaRegForm.value.especialidad) : console.log("cargada");
      //console.log(this.especialidades)

      this.auxEsp = this.especialidades; 
      this.especialistaRegForm.controls['especialidad'].setValue("");
    } 
  }





  registrarEspecialista() {

    
  console.log("antes de registrar " + this.auxEsp)

    this.authSVC.Register(this.correo, this.clave).then(response => {

      
      //  this.SubirFotoEspecialista(response.user.uid); 

      this.id = response.user.uid;

      if (this.foto1) {
        const filePath = `/usuarios/${this.id}/1.png`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.foto1);


        setTimeout(() => {

          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filePath);

          spaceRef.getDownloadURL().then(url => {


            this.fotoCargada1 = url
            this.fotoCargada1 = `${this.fotoCargada1}`

            console.log(this.fotoCargada1)
            console.log(this.especialidades)

            let especialista = new Especialista(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.fotoCargada1, this.auxEsp, 'especialista', this.estado);

            this.usuarioSrv.RegistrarEspecialista(especialista);

          });

        }, 2000);


      }
      else {
        console.log('no hay foto')
        console.log(this.especialidades)
        this.fotoCargada1 = "https://firebasestorage.googleapis.com/v0/b/clinicaonlinetp.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=79d91b85-41bf-4dcd-b3ae-0795bf8bfea8";
        let especialista = new Especialista(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.fotoCargada1, this.auxEsp, 'especialista', this.estado);

        this.usuarioSrv.RegistrarEspecialista(especialista);
      }





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