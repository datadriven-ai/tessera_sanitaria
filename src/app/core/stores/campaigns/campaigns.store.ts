import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {Partner} from "../../models/partner";
import {Campaign} from "../../models/campaign";

export interface CampaignState extends QueryState {
  status: string ;
}

@StoreConfig({ name: 'campaigns'})
@Injectable({providedIn: 'root'})
export class CampaignsStore extends EntityStore<CampaignState, Campaign> {
    constructor() {
      super({...getEmptyMeta(), status: ''});
    }
}
