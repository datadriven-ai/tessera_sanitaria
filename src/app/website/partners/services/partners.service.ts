import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {PartnerQuery} from "../../../core/stores/partners/partner.query";
import {PartnerStore} from "../../../core/stores/partners/partner.store";

@Injectable({providedIn: 'root'})
export class PartnersService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: PartnerStore,
    protected _query: PartnerQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'users-api/v1/';
  }

  getPartners(): void {
    this.get('backoffice/conventions' + this._query.queryString, true).subscribe();
  }
  getAllPartners(): any{
   return  this.get('backoffice/conventions/all');
  }
}
