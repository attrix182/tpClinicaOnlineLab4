import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  constructor(private authS: AuthService) { }

  ngOnInit(): void {
  }



  salir()
  {  
    this.authS.LogOutCurrentUser()
    location.assign('/landing')
  }
}

