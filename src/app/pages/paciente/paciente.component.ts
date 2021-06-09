import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  public turnos;
  public verMiPerfil: boolean;
  public verMisTurnos: boolean;
  public verSacarTurno: boolean;

  constructor(private authS: AuthService) {
    this.turnos = false;
    this.verMiPerfil = false
    this.verSacarTurno = false
    this.verMisTurnos = false
  }

  ngOnInit(): void {
  }



  salir() {
    this.authS.LogOutCurrentUser()
    location.assign('/landing')
  }

  miPerfil() {
    if (this.verMiPerfil) {
      this.verMiPerfil = false;
    }
    else {
      this.verSacarTurno = false;
      this.verMisTurnos = false;
      this.verMiPerfil = true;
    }
  }


  sacarTurno() {
    console.log(this.verSacarTurno)
    if (this.verSacarTurno) {
      this.verSacarTurno = false;
    }
    else {
      this.verSacarTurno = true;
      this.verMisTurnos = false;
    }
  }


  misTurnos() {

    if (this.verMisTurnos) {
      this.verMisTurnos = false;

    }
    else {
      this.verSacarTurno = false;
      this.verMisTurnos = true
    }
  }




}

