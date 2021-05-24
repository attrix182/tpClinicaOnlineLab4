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
  listarEspecialistas:boolean

  constructor() { 
    this.listarUsuarios = false;
    this.especialistas = false;
    this.listarEspecialistas = false;
  }


  listarUsuariosBtn()
  {
    if(this.listarUsuarios)
    {
      this.listarUsuarios = false;
    }

    else{
      this.listarEspecialistas = false;
      this.listarUsuarios = true;
    }

    console.log(this.listarUsuarios)

  }


  
  listarEspecialistasBtn()
  {



    if(this.listarEspecialistas)
    {
      this.listarEspecialistas = false;
    }

    else{
      this.listarUsuarios =false

      this.listarEspecialistas = true;
    }

    console.log(this.listarEspecialistas)

  }





  ngOnInit(): void {



  }

}
