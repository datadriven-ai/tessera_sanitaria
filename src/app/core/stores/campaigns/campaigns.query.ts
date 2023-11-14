import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {Campaign} from "../../models/campaign";
import {CampaignsStore, CampaignState} from "./campaigns.store";

@Injectable({providedIn: 'root'})
export class CampaignsQuery extends MetaQuery<CampaignState, Campaign> {

    get meta(): any {
      return {
        ...super.meta,
        status: this.getValue().status,
      };
    }

    constructor(protected store: CampaignsStore) {
        super(store);
        this.queryExceptions.push('status');
    }
}
