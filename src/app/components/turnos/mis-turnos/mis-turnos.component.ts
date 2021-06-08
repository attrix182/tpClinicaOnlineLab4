import { UsuarioService } from './../../../servicios/usuario.service';
import { Turno } from './../../../clases/turno';
import { MisTurnosService } from './../../../servicios/mis-turnos.service';
import { MisturnosModule } from './../../../modules/misturnos/misturnos.module';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {
  public turnos: Turno[] = [];

  public misTurnos: Turno[] = [];

  usuarios: Observable<any[]>;
  public listaEspecialidades: any[] = [];
  public listaUsuarios: any[] = [];
  public listaAdministradores: Admin[] = [];
  public listaEspecialistas: Especialista[] = [];
  public listaPacientes: Paciente[] = [];
  public pacienteActivo: Paciente;

  constructor(
    private turnosSVC: MisTurnosService,
    private authSvc: AuthService,
    private context: AngularFireDatabase
  ) {
    turnosSVC
      .TraerTurnos()
      .valueChanges()
      .subscribe((data) => {
        this.turnos = data;

        this.turnosPacienteActivo();

        console.log(this.misTurnos);
      });
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

  turnosPacienteActivo() {
    this.misTurnos.splice(0);
    this.turnos.forEach((unTurno) => {
      if (unTurno.paciente.id == this.pacienteActivo.id) {
        this.misTurnos.push(unTurno);
      }
    });
  }

  traerUsuario() {
    this.authSvc.GetCurrentUser().then((response) => {
      let user = this.listaPacientes.filter((u) => u.id == response.uid);

      this.pacienteActivo = user[0];
    });
  }

  public cargarListas() {
    this.listaUsuarios.forEach((usuario) => {
      this.traerUsuario();
      let perfil = usuario.perfil;

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

  imprimirPdf(): void {
    const DATA = document.getElementById('tablaTurnos');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 1,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_turnos.pdf`);
      });
  }
}
