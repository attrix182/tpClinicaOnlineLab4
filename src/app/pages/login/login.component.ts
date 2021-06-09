import { Especialista } from './../../clases/especialista';
import { Paciente } from './../../clases/paciente';
import { Admin } from './../../clases/admin';
import { AuthService } from './../../servicios/auth.service';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public unUsuario: Usuario;
  flag: boolean = true;


  usuarios: Observable<any[]>;
  listadoUsuarios = [];

  userForm: FormGroup;

  inicioRapido: boolean

  admin1:Admin
  admin2:Admin
  paciente1:Paciente
  paciente2:Paciente
  especialista1:Especialista
  especialista2:Especialista

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private fb: FormBuilder, private router: Router, private userSrv: UsuarioService,
    private authSVC: AuthService, private authService: AuthService, private context: AngularFireDatabase) {

    this.unUsuario = new Usuario();
    this.authService.LogOutCurrentUser();

    this.inicioRapido = false;

  }

  ngOnInit(): void {

    this.initForm();

    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
  
    }, error => console.log(error));

  }


  botonesIncio() {
    if (this.inicioRapido) {
      this.inicioRapido = false;
    }

    else {
      this.inicioRapido = true;
    }

    console.log(this.inicioRapido)

  }


  admin() {

    this.userForm.controls['email'].setValue("administrador@yopmail.com");
    this.userForm.controls['clave'].setValue("12345678");
  }

  paciente() {
    this.userForm.controls['email'].setValue("paciente@yopmail.com");
    this.userForm.controls['clave'].setValue("12345678");
  }

  especialista() {
    this.userForm.controls['email'].setValue("especialista@yopmail.com");
    this.userForm.controls['clave'].setValue("12345678");

  }


  onLogin() {

    this.authSVC.Login(this.userForm.value.email, this.userForm.value.clave).then((response: any) => {

      this.ValidarAdmin(response.user);

      let userAdmin = this.listadoUsuarios.filter(u => u.id == response.user.uid);



      if (response.user.emailVerified) {
        this.ValidarUser(response);
      }
      else {
        if (userAdmin[0].perfil != 'admin') {
          this.alert('warning', 'No ha validado su cuenta, revise su correo')
        }
      }

    }).catch(error => { this.alert('error', error) });
  }


  ValidarAdmin(usuario) {
    let userAdmin = this.listadoUsuarios.filter(u => u.id == usuario.uid);
    console.log(userAdmin[0].perfil)

    if (userAdmin[0].perfil == "admin") {
      

      this.router.navigate(["/seccionUsuarios"]);

    }


  }


  ValidarUser(usuario) {

    let user = this.listadoUsuarios.filter(u => u.id == usuario.user.uid);

    



    if (user[0].perfil == "especialista") {
      if (user[0].estado == false) {
        console.log('no habilitado')
        this.alert('error', 'Aun no ha sido hablitado')
      }
      else {
        console.log('habilitado')
        this.router.navigate(["/especialista"]);
      }
    } else if (user[0].perfil == "paciente") {
      this.router.navigate(["/paciente"]);
    }

  }




  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', Validators.required],
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