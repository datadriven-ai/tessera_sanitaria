import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {PromotionStore} from "../../../core/stores/promo-codes/promotion.store";
import {PromotionQuery} from "../../../core/stores/promo-codes/promotion.query";
import {PromoCode} from "../../../core/models/promoCode";
import {Observable, of} from "rxjs";
import {Campaign} from "../../../core/models/campaign";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PromotionsService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: PromotionStore,
    protected _query: PromotionQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'promo-api/v1/backoffice/';
  }

  getPromotions(): void {
    this.get('retrievePromotions' + this._query.queryString, true)
      .subscribe();
  }

  createPromoCode(body: PromoCode): Observable<void> {
    return this.post('promotion', body);
  }

  modifyPromoCode(promoID: number, body: PromoCode): Observable<void> {
    return this.put('promotion/' + promoID, body);
  }

  deletePromoCode(promo: PromoCode | undefined): Observable<void>{
    return this.delete('promotion/' + promo?.id);
  }

  retrieveCampaignStrategies(): Observable<any> {
    return this.get('retrieveStrategies').pipe(catchError(err => of([])));
  }

  createCampaign(body: Campaign): Observable<void> {
    return this.post('campaign', body);
  }

  updateCampaign(body: Campaign, id: number): Observable<void> {
    return this.put('campaign/' + id, body);
  }
}
