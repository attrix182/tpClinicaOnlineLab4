import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickEmoji]'
})
export class ClickEmojiDirective {

  constructor(private element: ElementRef) {

  }




  @HostListener('click') onClick() {

    this.activo()
    console.log('clickeo')

  }




  private activo() {

    this.element.nativeElement.style.background = 'green';
  
  }



}
