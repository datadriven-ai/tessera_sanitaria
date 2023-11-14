import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {map} from "rxjs/operators";
import {ReservationStore} from "./reservations.store";
import {RES_STATUS, Reservation} from "../../models/reservation";

export interface ReservationFilters extends QueryState {
  status: string;
}

@Injectable({providedIn: 'root'})
export class ReservationsQuery extends MetaQuery<ReservationFilters, Reservation> {

    mainPageReservations$ = this.selectAll({limitTo: 5});
    hasReservations$ = this.selectCount().pipe(map(res => res > 0));

    activeReservation$ = this.selectAll({filterBy: res => res.status === RES_STATUS.Prenotate});
    hasActiveReservations$ = this.activeReservation$.pipe(map(reservations => reservations.length > 0));

    pastBookings$ = this.selectAll({filterBy: res => res.status === RES_STATUS.Terminate});

  get meta(): any {
    const meta = super.meta;
    meta.status = this.getValue().status;
    return meta;
  }


    constructor(protected store: ReservationStore) {
        super(store);
    }

}
