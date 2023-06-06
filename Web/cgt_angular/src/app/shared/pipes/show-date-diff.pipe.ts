import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateDiff', pure: true })
export class DateDiffPipe implements PipeTransform {
  transform(pipeValue: any) {
    if (!pipeValue) return [];
    return moment(pipeValue, 'DD/MM/YYYY').fromNow();
  }
}
