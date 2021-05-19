
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public  AFauth: AngularFireAuth, private router: Router, private context: AngularFireDatabase) { }

  Login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(response => {
        resolve(response);
      }, (error: any) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            rejected("El usuario no existe");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave incorrecta");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });

    });

  }



  Register(email: string, password: string) {

    return new Promise<any>((resolve, rejected) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.EnviarMailDeVerificacion();
        resolve(response);
      }, (error: any) => {
        switch (error.code) {
          case "auth/weak-password":
            rejected("clave muy corta,minimo 6 caracteres");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave invalida");
            break;
          case "auth/email-already-in-use":
            rejected("El correo ya se encuentra tomado");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });
    });
  }

  async EnviarMailDeVerificacion(){
    return await (await this.AFauth.currentUser).sendEmailVerification(); 
  }

  GetCurrentUser() {
    return this.AFauth.currentUser;
  }

  LogOutCurrentUser() {
    this.AFauth.signOut();
  }



}