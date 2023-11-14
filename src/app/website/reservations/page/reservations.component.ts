import { Component, OnInit } from '@angular/core';
import {RES_STATUS, Reservation} from "../../../core/models/reservation";
import {MatTabChangeEvent} from "@angular/material/tabs/tab-group";
import {MatDialog} from "@angular/material/dialog";
import {ReservationsQuery} from "../../../core/stores/reservations/reservations.query";
import {SessionQuery} from "../../../core/stores/session/session.query";
import {LogService} from "../../../core/services/log.service";
import {ReservationService} from "../services/reservation.service";
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {ReservationModalComponent} from "../modals/reservation-modal/reservation-modal.component";
import {ReservationInfoModal} from "../modals/booking-info-modal/reservation-info-modal.component";

@Component({
  selector: 'hpb-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent extends BaseListComponent implements OnInit {

  tabs = Object.keys(RES_STATUS);

  constructor(
    private _log: LogService,
    private _reservations: ReservationsQuery,
    private _reservationService: ReservationService,
    private _dialog: MatDialog,
    private _user: SessionQuery,
  ) {
    super(_reservations);
  }

  ngOnInit(): void {
    this.toggleFilter(RES_STATUS.Prenotate);
  }

  toggleFilter(status: string): void {
    this._reservations.updateMeta('status', status);
    this.loadEntities();
  }

  loadEntities() {
    this._reservationService.getReservations();
  }

  openBookingDetail(r: Reservation): void {
    this._dialog.open(ReservationInfoModal, {data: r});
  }

  async openBookingOnBehalfModal(): Promise<void> {
    const refresh = await this._dialog.open(ReservationModalComponent, {panelClass: 'reservation-modal'}).afterClosed().toPromise();
    if (refresh) {this.loadEntities(); }
  }

  changeTab(event: MatTabChangeEvent): void{
    this.toggleFilter((RES_STATUS as any)[event.tab.textLabel]);
  }

}
