import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {

  listarUsuarios:boolean;
  especialistas:boolean;
  listarEspecialistas:boolean;
  registro:boolean;
  admins:boolean;

  constructor() { 
    this.listarUsuarios = false;
    this.especialistas = false;
    this.listarEspecialistas = false;
    this.registro = false;
    this.admins = false;
  }


  listarUsuariosBtn()
  {
    if(this.listarUsuarios)
    {
      this.listarUsuarios = false;
    }

    else{
      this.listarEspecialistas = false;
      this.registro = false;
      this.listarUsuarios = true;
    }

    console.log(this.listarUsuarios)

  }

  registroBtn()
  {
    if(this.registro)
    {
      this.registro = false;
    }

    else{
      this.listarEspecialistas = false;
      this.listarUsuarios = false;
      this.registro = true;
    }

    console.log(this.registro)

  }



  
  listarEspecialistasBtn()
  {

    if(this.listarEspecialistas)
    {
      this.listarEspecialistas = false;
    }

    else{
      this.listarUsuarios =false
      this.registro = false;
      this.listarEspecialistas = true;
    }

    console.log(this.listarEspecialistas)

  }


  listarAdminsBtn()
  {

    if(this.admins)
    {
      this.admins = false;
    }

    else{
      this.listarUsuarios =false
      this.especialistas =false
      this.registro = false;
      this.admins = true;
    }

    console.log(this.listarEspecialistas)

  }





  ngOnInit(): void {



  }

}
