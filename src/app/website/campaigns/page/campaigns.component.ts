import { Component, OnInit } from '@angular/core';
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {CampaignsQuery} from "../../../core/stores/campaigns/campaigns.query";
import {CampaignsService} from "../services/campaigns.service";
import {MatDialog} from "@angular/material/dialog";
import {NewCampaignModalComponent} from "../modals/new-campaign-modal/new-campaign-modal.component";
import {Campaign} from "../../../core/models/campaign";
import {MatSnackBar} from "@angular/material/snack-bar";
import { CAMPAIGN_STATUS} from "../../../core/models/campaign";

@Component({
  selector: 'hpb-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent extends BaseListComponent implements OnInit {

  tabs = Object.entries(CAMPAIGN_STATUS);

  constructor(
    private _campaigns: CampaignsQuery,
    private _dialog: MatDialog,
    private _snack: MatSnackBar,
    private _promotionService: CampaignsService
  ) {
    super(_campaigns);
    this._campaigns.updateMeta('status', this.tabs[0][1]);
  }

  loadEntities(): void {
    this._promotionService.getCampaigns();
  }

  async openNewCampaignModal(campaign?: Campaign, indexStatus?: number): Promise<void> {
    const refresh = await this._dialog.open(NewCampaignModalComponent, {height: '750px', data: {
        campaign: campaign,
        index: indexStatus
      }}).afterClosed().toPromise();
    if (refresh) {
      this.loadEntities();
    }
  }

  toggleEvent(campaign: Campaign): void {
    const call = campaign.isInterrupted ? this._promotionService.resume(campaign) : this._promotionService.stop(campaign);
    call.subscribe(
      () => {},
          error => this._snack.open(error.error.messaggio)
    );
  }

   changeTab(i: any): void {
    this._campaigns.updateMeta('status', this.tabs[i][1]);
    this.loadEntities();
  }

}
