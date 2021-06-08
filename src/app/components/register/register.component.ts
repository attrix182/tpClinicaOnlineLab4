import { Especialidad } from './../../clases/especialidad';
import { Especialista } from './../../clases/especialista';
import { AuthService } from './../../servicios/auth.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from './../../clases/paciente';

import { UsuarioService } from './../../servicios/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import * as firebase from 'firebase';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
  public cargando: boolean;
  public alertar: boolean;

  public number1: number;
  public number2: number;
  public number3: number;
  public capcha: any;
  public entrada: any;
  public display: any;
  public msj: any;
  public mensaje: any;

  correo: string;
  clave: string;

  nombre: string;
  apellido: string;

  dni: number;
  edad: number;
  obraSocial: string;

  especialidades = [];
  especialidad: string;

  unaEspecialidad: Especialidad;

  estado: boolean;

  auxEsp = [];

  cap: any;

  keyword = 'nombre';
  
  public inputEspecialidades: any = '';

  private isEmail = /\S+@\S+\.\S+/;

  //  public listaEspecialidades$: Observable<any[]>;

  public listaEspecialidades:any[]=[];

  @ViewChild('auto') auto;

  @Output() emitRegister: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private usuarioSrv: UsuarioService,
    private storage: AngularFireStorage,
    private authSVC: AuthService
  ) {
    this.tipo = '';
    this.estado = false;
    this.cargando = false;
    this.alertar = false;

    this.unaEspecialidad = new Especialidad('', '');
    this.number1 = Math.floor(Math.random() * 9 + 1);
    this.number2 = Math.floor(Math.random() * 9 + 1);
    this.number3 = Math.floor(Math.random() * 9 + 1);

    this.capcha =
      this.number1.toString() +
      this.number2.toString() +
      this.number3.toString();

    this.msj = '';

    // this.listaEspecialidades$ = usuarioSrv.TraerEspecialidades().valueChanges();

    usuarioSrv
      .TraerEspecialidades()
      .valueChanges()
      .subscribe((data) => {
        this.listaEspecialidades = data;
      });
  }

  public onEnter()
  {
  let unaEspecialidad:Especialidad=new Especialidad(this.inputEspecialidades,false)
    console.log(unaEspecialidad);

  }

  



  ngOnInit(): void {
    this.initForm();
  }

  paciente() {
    this.tipo = 'paciente';
  }

  especialista() {
    this.tipo = 'especialista';
  }

  ninguno() {
    this.tipo = '';
  }

  public AgregarALista(especialidad:Especialidad){  
    let encontro=false;

    this.unEspecialista.especialidades.forEach(element => {
      if(element==especialidad.nombre)
      {
        encontro=true;
      }
    });

    if(!encontro)
    {
      this.unEspecialista.especialidades.push(especialidad.nombre);    
    }
 
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
      this.registrarPaciente();
      this.pacienteRegForm.reset();

      setTimeout(() => {
        this.alert('success', 'Registro exitoso, recuerde validar su correo');
        this.cargando = false;

        setTimeout(() => {
          location.assign('/login');
        }, 1500);
      }, 3000);
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

      this.registrarEspecialista();
      this.especialistaRegForm.reset();
      this.especialidades = [];

      setTimeout(() => {
        this.alert('success', 'Registro exitoso, recuerde validar su correo');
        this.cargando = false;

        setTimeout(() => {
          location.assign('/login');
        }, 1500);
      }, 3000);
    }
  }

  registrarPaciente() {
    this.cargando = true;

    this.authSVC
      .Register(this.correo, this.clave)
      .then((response) => {
        this.id = response.user.uid;

        if (this.foto1 && this.foto2) {
          const filePath = `/usuarios/${this.id}/1.png`;
          const ref = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, this.foto1).then(() => {
            const filePath2 = `/usuarios/${this.id}/2.png`;
            const ref2 = this.storage.ref(filePath2);
            const task2 = this.storage
              .upload(filePath2, this.foto2)
              .then(() => {
                let storages = firebase.default.storage();
                let storageRef = storages.ref();
                let spaceRef = storageRef.child(filePath);

                let storages2 = firebase.default.storage();
                let storageRef2 = storages2.ref();
                let spaceRef2 = storageRef2.child(filePath2);

                spaceRef.getDownloadURL().then((url) => {
                  this.fotoCargada1 = url;
                  this.fotoCargada1 = `${this.fotoCargada1}`;

                  console.log(this.fotoCargada1);

                  spaceRef2.getDownloadURL().then((url) => {
                    this.fotoCargada2 = url;
                    this.fotoCargada2 = `${this.fotoCargada2}`;

                    console.log(this.fotoCargada2);

                    let paciente = new Paciente(
                      this.nombre,
                      this.apellido,
                      this.correo,
                      this.clave,
                      this.edad,
                      this.dni,
                      this.obraSocial,
                      this.fotoCargada1,
                      this.fotoCargada2,
                      'paciente'
                    );

                    this.usuarioSrv.RegistrarPaciente(paciente);
                    this.cargando = false;
                    this.alertar = true;
                  });
                });
              });
          });
        } else {
          this.fotoCargada1 = `https://firebasestorage.googleapis.com/v0/b/clinicaonlinetp.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=79d91b85-41bf-4dcd-b3ae-0795bf8bfea8`;
          this.fotoCargada2 = `https://firebasestorage.googleapis.com/v0/b/clinicaonlinetp.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=79d91b85-41bf-4dcd-b3ae-0795bf8bfea8`;
          let paciente = new Paciente(
            this.nombre,
            this.apellido,
            this.correo,
            this.clave,
            this.edad,
            this.dni,
            this.obraSocial,
            this.fotoCargada1,
            this.fotoCargada2,
            'paciente'
          );

          this.usuarioSrv.RegistrarPaciente(paciente);
          this.alert('info', 'Registro exitoso, pero como iamgenes genericas');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  AgregarEspecialidades() {
    if (this.especialistaRegForm.value.especialidad == '') {
      this.alert('error', 'No eligio ninguna especialidad');
    } else {

      let auxEspecialidad = this.especialidades.filter(
        (e) => e == this.especialistaRegForm.value.especialidad
      );
      auxEspecialidad.length == 0
        ? this.especialidades.push(this.especialistaRegForm.value.especialidad)
        : console.log('cargada');
      //console.log(this.especialidades)

      this.auxEsp = this.especialidades;
      this.especialistaRegForm.controls['especialidad'].setValue('');
    }
  }




  registrarEspecialista() {
    this.cargando = true;
    console.log('antes de registrar ' + this.auxEsp);

    this.authSVC
      .Register(this.correo, this.clave)
      .then((response) => {
        this.id = response.user.uid;

        if (this.foto1) {
          const filePath = `/usuarios/${this.id}/1.png`;
          const ref = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, this.foto1);

          setTimeout(() => {
            let storages = firebase.default.storage();
            let storageRef = storages.ref();
            let spaceRef = storageRef.child(filePath);

            spaceRef.getDownloadURL().then((url) => {
              this.fotoCargada1 = url;
              this.fotoCargada1 = `${this.fotoCargada1}`;

              let especialista = new Especialista(
                this.nombre,
                this.apellido,
                this.correo,
                this.clave,
                this.edad,
                this.dni,
                this.fotoCargada1,
                this.auxEsp,
                'especialista',
                this.estado
              );

              this.usuarioSrv.RegistrarEspecialista(especialista);
              this.cargando = false;
              this.alertar = true;
            });
          }, 2000);
        } else {
          console.log('no hay foto');
          console.log(this.especialidades);
          this.fotoCargada1 =
            'https://firebasestorage.googleapis.com/v0/b/clinicaonlinetp.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=79d91b85-41bf-4dcd-b3ae-0795bf8bfea8';
          let especialista = new Especialista(
            this.nombre,
            this.apellido,
            this.correo,
            this.clave,
            this.edad,
            this.dni,
            this.fotoCargada1,
            this.auxEsp,
            'especialista',
            this.estado
          );

          this.usuarioSrv.RegistrarEspecialista(especialista);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onUploadEspecialista($event) {
    console.log($event);
    this.foto1 = $event.target.files[0];
  }

  onUploadPaciente($event, num: number) {
    if (num == 1) {
      console.log($event);
      this.foto1 = $event.target.files[0];
    } else if (num == 2) {
      console.log($event);
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
    let index = this.especialidades.indexOf(especialidad);
    this.especialidades.splice(index, 1);
  }

  private initForm(): void {
    this.pacienteRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      obraSocial: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      capchaInput: ['', [Validators.required]],
    });

    this.especialistaRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      especialidades: ['', [Validators.minLength(0)]],
      especialidad: ['', [Validators.minLength(0)]],
      capchaInput: ['', [Validators.required]],
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
