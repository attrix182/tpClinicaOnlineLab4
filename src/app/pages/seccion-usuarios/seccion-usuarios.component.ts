import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {

  listarUsuarios:boolean;
  especialistas:boolean;

  constructor() { 
    this.listarUsuarios = false;
    this.especialistas = false;
  }


  listarUsuariosBtn()
  {
    if(this.listarUsuarios)
    {
      this.listarUsuarios = false;
    }

    else{
      this.listarUsuarios = true;
    }

    console.log(this.listarUsuarios)

  }

  administrarEspecialistas()
  {
    if(this.especialistas)
    {
      this.especialistas = false;
    }

    else{
      this.especialistas = true;
    }

    console.log(this.especialistas)

  }



  ngOnInit(): void {



  }

}
