import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primerLetraMayus'
})
export class PrimerLetraMayusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    return value[0].toUpperCase() + value.slice(1);
  
  }

}
