import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {Reservation} from "../../models/reservation";
import {ReservationFilters} from './reservations.query';

@StoreConfig({ name: 'reservations', idKey: 'bookingId' })
@Injectable({providedIn: 'root'})
export class ReservationStore extends EntityStore<ReservationFilters, Reservation> {
    constructor() {
        super(getEmptyMeta());
    }
}
