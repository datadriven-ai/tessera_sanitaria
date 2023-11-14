import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {Partner} from "../../models/partner";

@StoreConfig({ name: 'partners', idKey: 'channelId'})
@Injectable({providedIn: 'root'})
export class PartnerStore extends EntityStore<QueryState, Partner> {
    constructor() {
        super(getEmptyMeta());
    }
}
