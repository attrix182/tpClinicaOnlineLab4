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

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private fb: FormBuilder, private router: Router, private userSrv: UsuarioService,
    private authSVC: AuthService, private authService: AuthService, private context: AngularFireDatabase) {

    this.unUsuario = new Usuario();
    this.authService.LogOutCurrentUser();

  }

  ngOnInit(): void {

    this.initForm();

    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
    }, error => console.log(error));

  }

  onLogin() {

    this.authSVC.Login(this.userForm.value.email, this.userForm.value.clave).then((response: any) => {
      this.ValidarAdmin(response.user);
      if (response.user.emailVerified) {
        this.ValidarUser(response);
      }
      else {
        this.alert('warning', 'No ha validado su cuenta, revise su correo')
      }
    }).catch(error => { this.alert('error', error) });
  }


  ValidarAdmin(usuario) {
    let userAdmin = this.listadoUsuarios.filter(u => u.id == usuario.uid);
    if (userAdmin[0].perfil == "admin") {
      this.router.navigate(["/admin"]);
      this.flag = false;
    }
    else if (usuario.email == "profesional@profesional.com") {

      this.router.navigate(["/especialista"]);
      this.flag = false;
    }
    else if (usuario.email == "paciente@paciente.com") {
      this.router.navigate(["/paciente"]);
      this.flag = false;
    }

  }


  ValidarUser(usuario) {

    let user = this.listadoUsuarios.filter(u => u.id == usuario.user.uid);
    console.log(user)

    if (user[0].perfil == "especialista") {
      if (user[0].habilitado == false) {
        console.log('no habilitado')
        this.router.navigate(["/noHabilitado"]);
      }
      else {
        console.log('habilitado')
        this.router.navigate(["/especialista"]);
      }
    } else {
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