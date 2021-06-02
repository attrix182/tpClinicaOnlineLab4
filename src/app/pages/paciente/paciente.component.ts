import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  public turnos;
  constructor(private authS: AuthService) {
    this.turnos = false;
   }

  ngOnInit(): void {
  }



  salir()
  {  
    this.authS.LogOutCurrentUser()
    location.assign('/landing')
  }
}

