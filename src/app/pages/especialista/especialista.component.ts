import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {

  constructor(private authS: AuthService) { }

  ngOnInit(): void {
  }

  salir()
  {  
    this.authS.LogOutCurrentUser()
    location.assign('/landing')
  }

}
