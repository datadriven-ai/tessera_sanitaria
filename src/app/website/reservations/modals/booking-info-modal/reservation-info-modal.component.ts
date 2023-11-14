import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReservationService} from "../../services/reservation.service";
import {DocumentService} from "../../../reports/services/document.service";
import {LogService} from "../../../../core/services/log.service";
import {RES_STATUS, Reservation, ReservationDetail} from "../../../../core/models/reservation";
import {toMoment} from "../../../../core/utils/functions";
import {ConfirmModalComponent} from "../../../../shared/modals/confirm-modal/confirm-modal.component";
import {ReservationModalComponent} from "../reservation-modal/reservation-modal.component";

@Component({
  selector: 'hp-booking-info-modal',
  templateUrl: './reservation-info-modal.component.html',
  styleUrls: ['./reservation-info-modal.component.scss']
})
export class ReservationInfoModal implements OnInit {

  isLoading = false;
  reservation: ReservationDetail;
  error = '';

  get isPaid():boolean {
    return this.reservation.paymentStatus !== "NON_PAGATO";
  }

  get disableCall(): boolean {
    return !this.reservation.canStartVisit || this.isLoading;
  }

  get duration(): number {
    return toMoment(this.reservation.visitEnd).diff(toMoment(this.reservation.visitStart), 'minutes');
  }

  get isEditable(): boolean {
    return this.reservation.status === RES_STATUS.Prenotate && !this.reservation.locationId;
  }

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: ReservationDetail,
      private _dialogRef: MatDialogRef<ReservationInfoModal>,
      private _dialog: MatDialog,
      private _snack: MatSnackBar,
      private _reservationService: ReservationService,
      private _fileService: DocumentService,
      private _log: LogService,
  ) {
    this.reservation = data;
  }

  ngOnInit(): void {
    this.refreshBooking();
  }

  async refreshBooking(): Promise<void> {
    this.isLoading = true;
    const b = await this._reservationService.getBooking(this.reservation.bookingId);
    if (b) {
      this.reservation = b;
    }
    this.isLoading = false;
  }

  downloadFile(fileID: string, filename: string): void {
    this._fileService.download(fileID, filename);
  }

  async cancelBooking(): Promise<void> {
    const confirm = await this._dialog.open(ConfirmModalComponent, {
      minWidth: '400px',
      minHeight: '170px',
      backdropClass: 'none',
      data: null,
      disableClose: true,
    }).afterClosed().toPromise();
    if (confirm) {
      this._reservationService.cancelBooking(this.reservation.bookingId).subscribe(
          success => {
            this._dialogRef.close(true);
            this._reservationService.getReservations();
            this._snack.open('La prenotazione e\' stata cancellata', 'OK');
          },
          error => this._snack.open('Impossibile cancellare la prenotazione')
      );
    }
  }

  async modifyBooking(): Promise<void> {
    const refresh = await this._dialog.open(ReservationModalComponent, {panelClass: 'reservation-modal', data: this.reservation}).afterClosed().toPromise();
    if (refresh) {
      this._snack.open('L\'orario è stato aggiornato.', 'OK');
      this.refreshBooking();
      this._reservationService.getReservations();
    }
  }

}
