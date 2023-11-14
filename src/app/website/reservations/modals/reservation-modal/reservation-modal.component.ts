import {Component, Inject, OnInit, Optional} from '@angular/core';

import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AuthService} from "../../../../core/services/auth.service";
import {environment} from "../../../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Reservation} from "../../../../core/models/reservation";
import {LogService} from "../../../../core/services/log.service";

@Component({
  selector: 'hpb-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {

  safeURL: SafeResourceUrl | undefined;

  private resURL = environment.reservationURL;

  constructor(
      @Inject(MAT_DIALOG_DATA) @Optional() private data: Reservation,
      private _log: LogService,
      private _dialogRef: MatDialogRef<ReservationModalComponent>,
      private _sanitizer: DomSanitizer,
      private _auth: AuthService
  ) {
    if (this.data) {
      this._log.log(this.data);
      this.resURL += '/edit';

    }
    window.addEventListener("message", (event) => {
      if(event.origin === environment.reservationURL && event.data) {
        this._dialogRef.close(event.data.refresh);
      }
    });
  }

  ngOnInit(): void {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.resURL +
      '?appId=' + environment.context +
      (!!this.data ?  '&bookingId=' + this.data.bookingId : '') +
      '&jwt=' + this._auth.token
    );
  }

}
