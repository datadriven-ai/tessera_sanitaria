import {ReservationStore} from '../../../core/stores/reservations/reservations.store';
import {Injectable} from '@angular/core';
import {Reservation, ReservationDetail} from '../../../core/models/reservation';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {BaseService} from '../../../core/services/base.service';
import {LogService} from '../../../core/services/log.service';
import {ReservationsQuery} from '../../../core/stores/reservations/reservations.query';

@Injectable({providedIn: 'root'})
export class ReservationService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: ReservationStore,
    protected _query: ReservationsQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'bookings-api/v1/';
  }

  getReservations(): void {
    this.get('backoffice/reservations' + this._query.queryString , true)
      .subscribe();
  }

  async getBooking(bookingID: number): Promise<ReservationDetail | undefined> {
    return  await this.get('booking/' + bookingID + '/detail')
      .pipe(catchError(err => of(undefined))).toPromise();
  }

  refreshToken(bookingID: number): Observable<any | null> {
    return this.get('visit/' + bookingID + '/start')
      .pipe(catchError(err => of(null)));
  }

  cancelBooking(bookingID: number): Observable<void> {
    return this.delete('visit/' + bookingID);
  }

}
