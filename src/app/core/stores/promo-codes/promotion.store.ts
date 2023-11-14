import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {PromoCode} from "../../models/promoCode";
import {PromoQuery} from "./promotion.query";

@StoreConfig({ name: 'promotions'})
@Injectable({providedIn: 'root'})
export class PromotionStore extends EntityStore<PromoQuery, PromoCode> {
    constructor() {
        super({...getEmptyMeta(), isActive: true});
    }
}
