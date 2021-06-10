import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysDatos', pure: false  })
export class KeysDatosPipe implements PipeTransform {

  transform(input: any): any {
    let keys = [];
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        keys.push({ key: key, value: input[key]});
      }
    }
    return keys;
  }
}

