import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'separator'})
export class SeparatorPipe implements PipeTransform {

  transform(values: any[], separator: string): string {
    let s = '';
    values.forEach((t: any) => s += t ? t + separator : '');
    return s.slice(0, - separator.length);
  }

}
