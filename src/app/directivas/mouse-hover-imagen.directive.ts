import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appMouseHoverImagen]'
})
export class MouseHoverImagenDirective {

  public entro: boolean;

  constructor(private element: ElementRef) {

  }


  @HostListener('mouseleave') onMouseExit() {

    // this.borde()
    if (!this.entro) {
      this.element.nativeElement.style.border = '';
    }



  }


  @HostListener('mouseenter') onMouseEnter() {


    this.borde()

  }

  @HostListener('click') onClick() {

    this.entro = true;
    this.activo()

  }




  private borde() {

    this.element.nativeElement.style.border = '3px solid #007BFE';
  }

  private activo() {

    this.element.nativeElement.style.border = '3px solid #007BFE';
  
  }



}
