import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys', pure: false  })

export class KeyValuePipe implements PipeTransform {
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

