import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "../../../../core/models/campaign";
import {CampaignsService} from "../../services/campaigns.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'hpb-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent{

  @Input() campaign: Campaign | undefined;
  @Output() editClicked = new EventEmitter();
  @Output() toggleClicked = new EventEmitter();
  @Input() index: number | undefined;

  constructor(
    private campaignService: CampaignsService,
    private snackBar: MatSnackBar
  ) {
  }

  deleteCampaign(campaign: Campaign) {
    this.campaignService.deleteCampaign(campaign).subscribe(
      () => this.campaignService.getCampaigns(),
      ()  => this.snackBar.open('Impossibile cancellare la Campagna'));
  }
}
