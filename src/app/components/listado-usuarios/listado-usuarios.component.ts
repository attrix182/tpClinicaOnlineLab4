import { Admin } from './../../clases/admin';
import { Paciente } from './../../clases/paciente';
import { Especialista } from './../../clases/especialista';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: Observable<any[]>;

  public listaUsuarios: any[] = [];

  public listaAdministradores: Admin[] = [];
  public listaEspecialistas: Especialista[] = [];
  public listaPacientes: Paciente[] = [];

  public listarEsp: any;
  public listarAdm: any;
  public listarPac: any;
  public listarUsrs:any;

  constructor(private context: AngularFireDatabase) {}

  public cargarListas() {
    this.listaUsuarios.forEach((usuario) => {
      let perfil = usuario.perfil;

      console.log(perfil);

      switch (perfil) {
        case 'admin':
          this.listaAdministradores.push(usuario);
          break;
        case 'especialista':
          this.listaEspecialistas.push(usuario);
          break;
        case 'paciente':
          this.listaPacientes.push(usuario);
          break;
      }
    });
  }



  listarPacientes(){
    this.listarPac=true
    this.listarEsp=false
    this.listarAdm=false
    this.listarUsrs=false
  }
  listarEspecialistas(){
    this.listarPac=false
    this.listarEsp=true
    this.listarAdm=false
    this.listarUsrs=false
  }
  listarAdministradores(){
    this.listarPac=false
    this.listarEsp=false
    this.listarAdm=true
    this.listarUsrs=false
  }

  listarTodos(){
    this.listarPac=false
    this.listarEsp=false
    this.listarAdm=false
    this.listarUsrs=true
  }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();

    this.usuarios.subscribe(
      (usuarios) => {
        this.listaUsuarios = usuarios;
        this.cargarListas();
      },
      (error) => console.log(error)
    );
  }

  generarExcel() {
    //Creo el libro de excel
    let workbook = new Workbook();

    //Creo la hoja de excel
    let worksheet = workbook.addWorksheet("Listado de Usuarios");

    //Agrego los titulos de la hoja
    let header = ["Nombre", "Apellido", "Edad", "DNI", "Correo", "Perfil"];
    let headerRow = worksheet.addRow(header);

    for (let item of this.listaUsuarios) {
      let aux = [item.nombre ,  item.apellido , item.edad , item.dni , item.correo , item.perfil ];

      worksheet.addRow(aux);
    }

    let fname = "Listado de Usuarios";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '.xlsx');
    });
  }


}
