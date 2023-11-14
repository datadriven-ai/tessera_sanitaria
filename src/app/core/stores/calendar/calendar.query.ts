import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {CalendarStore} from './calendar.store';
import {CalendarEvent} from 'angular-calendar';
import {toMoment} from '../../../shared/utils/functions';
import {Slot} from '../../models/calendarEvent';

@Injectable()
export class CalendarQuery extends MetaQuery<QueryState, CalendarEvent<Slot>> {

    events$ = this.selectAll();
    todayEvents$ = this.selectAll({filterBy: entity => toMoment().format('DDMMYY') === toMoment(entity.start).format('DDMMYY')});

    constructor(protected store: CalendarStore) {
        super(store);
    }

}
