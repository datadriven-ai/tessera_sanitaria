import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {CalendarEvent} from 'angular-calendar';

@StoreConfig({ name: 'calendar'})
@Injectable()
export class CalendarStore extends EntityStore<QueryState, CalendarEvent> {
    constructor() {
        super(getEmptyMeta());
    }
}
