import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddressModalComponent} from "../../modals/address-modal/address-modal.component";
import {ContactsModalComponent} from "../../modals/contacts-modal/contacts-modal.component";

@Component({
  selector: 'hpb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {

  constructor(private _dialog: MatDialog) {
  }

  openAddressModal($event: MouseEvent): void {
    const position = {
      bottom: '16px',
      left: ($event.x - 400) + 'px'
    };
    this._dialog.open(AddressModalComponent, {
      width: '400px',
      height: '270px',
      disableClose: false,
      backdropClass: 'none',
      position
    });
  }

  openContactModal($event: MouseEvent): void {
    const position = {
      bottom: '16px',
      left: ($event.x - 400) + 'px'
    };
    this._dialog.open(ContactsModalComponent, {
      width: '400px',
      height: '250px',
      disableClose: false,
      backdropClass: 'none',
      position
    });
  }

}
