import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {CampaignsStore} from "../../../core/stores/campaigns/campaigns.store";
import {CampaignsQuery} from "../../../core/stores/campaigns/campaigns.query";
import {Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Campaign} from "../../../core/models/campaign";

@Injectable({providedIn: 'root'})
export class CampaignsService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: CampaignsStore,
    protected _query: CampaignsQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'promo-api/v1/backoffice/';
  }

  getCampaigns(): void {
    this.get('retrieveCampaigns' + this._query.queryString, true)
      .subscribe();
  }

  resume(promo: Campaign): Observable<any> {
    return this.put('resume/campaign/' + promo.id).pipe(
      tap(response => this._store.update(promo.id, {isInterrupted: false}))
    );
  }

  stop(promo: Campaign): Observable<any>  {
    return this.put('stop/campaign/' + promo.id).pipe(
        tap(response => this._store.update(promo.id, {isInterrupted: true})
    ));
  }

  deleteCampaign(campaign: Campaign){
    return this.delete('campaign/' + campaign.id);

  }
}
