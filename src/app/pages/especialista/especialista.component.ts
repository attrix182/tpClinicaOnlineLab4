import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {

  public verPerfil:boolean;
  public compturnos:boolean;

  constructor(private authS: AuthService) {    

    this.verPerfil = false;
    this.compturnos = false;
  }

  mostrarMiPerfil()
  {
    if(this.verPerfil)
    {
      this.verPerfil = false;
    }

    else{

      this.verPerfil = true;
    }

  }

  ngOnInit(): void {
  }


  salir()
  {  
    this.authS.LogOutCurrentUser()
    location.assign('/landing')
  }

  gestionarTurnos()
  {   
     if(this.compturnos)
    {

      this.compturnos = false;
    }

    else{
      this.verPerfil = false
      this.compturnos = true;
    }

  }

}
