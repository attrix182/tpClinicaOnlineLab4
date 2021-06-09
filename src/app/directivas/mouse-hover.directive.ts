import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appMouseHover]'
})

export class MouseHoverDirective {

  constructor(private element: ElementRef) { 

  }


  @HostListener('mouseleave') onMouseExit() {

    this.marcar('')
  }


  @HostListener('mouseenter') onMouseEnter() { 


    this.marcar('#007BFE')
  }
  



  private marcar(color:string){

    
    this.element.nativeElement.style.color = color;
  }



}
