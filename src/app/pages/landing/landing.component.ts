import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  carga:boolean;

  constructor() { this.carga = false}

  ngOnInit(): void {

    setTimeout(() => {
      this.carga = true;
    }, 1200);

  }

}
