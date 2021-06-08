import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  public turnos;
  public verMiPerfil:boolean;
  constructor(private authS: AuthService) {
    this.turnos = false;
    this.verMiPerfil = false
   }

  ngOnInit(): void {
  }



  salir()
  {  
    this.authS.LogOutCurrentUser()
    location.assign('/landing')
  }

  miPerfil()
  {
    if(this.verMiPerfil)
    {
      this.verMiPerfil = false;
    }
    else{
      this.verMiPerfil = true
    }
  }
}

