import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-inicio-rapido',
  templateUrl: './boton-inicio-rapido.component.html',
  styleUrls: ['./boton-inicio-rapido.component.scss']
})
export class BotonInicioRapidoComponent implements OnInit {

  @Input() user:any;

  constructor() { }

  ngOnInit(): void {
  }

}
