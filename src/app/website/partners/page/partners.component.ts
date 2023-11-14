import { Component, OnInit } from '@angular/core';
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {PartnerQuery} from "../../../core/stores/partners/partner.query";
import {PartnersService} from "../services/partners.service";
import {MatDialog} from "@angular/material/dialog";
import {NewPartnerModalComponent} from "../modals/new-partner-modal/new-partner-modal.component";
import {PartnerCatalogComponent} from "../modals/partner-catalog/partner-catalog.component";
import {Partner} from "../../../core/models/partner";
import {ImporterModalComponent} from "../modals/importer-modal/importer-modal.component";

@Component({
  selector: 'hpb-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent extends BaseListComponent implements OnInit{

  constructor(
    private _dialog: MatDialog,
    private _partners: PartnerQuery,
    private _partnerService: PartnersService,
  ) {
    super(_partners);
  }

  loadEntities(): void {
    this._partnerService.getPartners();
  }

  async openDialog(partner?: Partner): Promise<void> {
    const refresh = await this._dialog.open(NewPartnerModalComponent, {data: partner}).afterClosed().toPromise();
    if (refresh) {
      this.loadEntities();
    }
  }

  openCatalog(partner: Partner): void {
    this._dialog.open(PartnerCatalogComponent, {data: partner});
  }

  importUsers(partner: Partner): void {
    this._dialog.open(ImporterModalComponent, {data: partner.channelId});
  }

}
