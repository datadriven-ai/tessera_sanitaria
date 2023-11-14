import { Component, OnInit } from '@angular/core';
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {LogService} from "../../../core/services/log.service";
import {ReservationsQuery} from "../../../core/stores/reservations/reservations.query";
import {ReservationService} from "../../reservations/services/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {SessionQuery} from "../../../core/stores/session/session.query";

@Component({
  selector: 'hpb-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent extends BaseListComponent implements OnInit {

  tabs = ['Prenotate', 'Effettuate'];

  constructor(
    private _log: LogService,
    private _reservations: ReservationsQuery,
    private _reservationService: ReservationService,
    private _dialog: MatDialog,
    private _user: SessionQuery,
  ) {
    super(_reservations);
  }

  ngOnInit() {

  }

}
