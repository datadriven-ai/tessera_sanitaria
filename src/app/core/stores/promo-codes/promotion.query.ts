import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {PromotionStore} from "./promotion.store";
import {PromoCode} from "../../models/promoCode";

export interface PromoQuery extends QueryState {
  type: string;
  isActive: boolean;
}

@Injectable({providedIn: 'root'})
export class PromotionQuery extends MetaQuery<PromoQuery, PromoCode> {

  get meta(): any {
    return {
      ...super.meta,
      isActive: this.getValue().isActive,
      type: this.getValue().type
    };
  }

    constructor(protected store: PromotionStore) {
        super(store);
        this.queryExceptions.push('isActive');
    }
}
