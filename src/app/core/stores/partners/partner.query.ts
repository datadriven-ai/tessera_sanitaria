import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {Partner} from "../../models/partner";
import {PartnerStore} from "./partner.store";

@Injectable({providedIn: 'root'})
export class PartnerQuery extends MetaQuery<QueryState, Partner> {

    constructor(protected store: PartnerStore) {
        super(store);
    }
}
