import {Pipe, PipeTransform} from "@angular/core";
import * as Moment from 'moment';
import {BookingType} from '../models/calendarEvent';

@Pipe({name: 'visityTypeIcon'})
export class VisitTypeIconPipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case BookingType.VISIT:
        return 'videocam';
      case BookingType.PHONE:
        return 'phone_in_talk';
      case BookingType.LOCAL:
      default:
        return 'home';
    }
  }

}
