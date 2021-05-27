import { AuthService } from './../../servicios/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from './../../clases/admin'




import { UsuarioService } from './../../servicios/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import * as firebase from 'firebase';
@Component({
  selector: 'app-agregar-admins',
  templateUrl: './agregar-admins.component.html',
  styleUrls: ['./agregar-admins.component.scss']
})
export class AgregarAdminsComponent implements OnInit {


  adminRegForm: FormGroup;

  public unAdmin: Admin;

  public tipo: string;

  public id: any;
  public foto1: any;
  public foto2: any;
  public fotoCargada1: any;
  public fotoCargada2: any;
  public cargando: boolean;
  public alertar: boolean;

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

  constructor(private fb: FormBuilder, private router: Router, private usuarioSrv: UsuarioService, private storage: AngularFireStorage, private authSVC: AuthService) {

    this.tipo = 'Administrador'
    this.estado = false;
    this.cargando = false;
    this.alertar = false;
  }


  ngOnInit(): void {
    this.initForm();

  }


  onRegisterAdmin() {
    if (this.adminRegForm.valid) {


      this.nombre = this.adminRegForm.value.nombre;
      this.apellido = this.adminRegForm.value.apellido;
      this.correo = this.adminRegForm.value.correo;
      this.clave = this.adminRegForm.value.clave;
      this.dni = this.adminRegForm.value.dni;
      this.edad = this.adminRegForm.value.edad;

      this.registrarAdmin();
      this.adminRegForm.reset();

      setTimeout(() => {
        this.alert('success', 'Registro exitoso, recuerde validar su correo');
      }, 800);
    }
  }


  registrarAdmin() {

    this.cargando = true;

    this.authSVC.Register(this.correo, this.clave).then(response => {

      this.id = response.user.uid;

      if (this.foto1) {

        const filePath = `/usuarios/${this.id}/1.png`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.foto1).then(() => {


          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filePath);


          spaceRef.getDownloadURL().then(url => {

            this.fotoCargada1 = url
            this.fotoCargada1 = `${this.fotoCargada1}`

            console.log(this.fotoCargada1)

            let admin = new Admin(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.fotoCargada1, 'admin');

            this.usuarioSrv.registrarAdmin(admin);
            this.cargando = false;
            this.alertar = true;
          });

        });

      }
      else {
        this.fotoCargada1 = `https://firebasestorage.googleapis.com/v0/b/clinicaonlinetp.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=79d91b85-41bf-4dcd-b3ae-0795bf8bfea8`;
        let admin = new Admin(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.fotoCargada1, 'admin');

        this.usuarioSrv.registrarAdmin(admin);
        this.alert('info', 'Registro exitoso, pero como imagenes genericas')
      }



    }).catch(error => { console.log(error); });


  }




  onUploadAdmin($event, num: number) {

    if (num == 1) {
      console.log($event)
      this.foto1 = $event.target.files[0];
    }

    else if (num == 2) {
      console.log($event)
      this.foto2 = $event.target.files[0];
    }
  }



  isValidAdmin(field: string): string {
    const validateField = this.adminRegForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }




  private initForm(): void {
    this.adminRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]]
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
