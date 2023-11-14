import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {OrdersStore} from "../../../core/stores/orders/orders.store";
import {Observable} from "rxjs";
import {OrdersQuery} from "../../../core/stores/orders/orders.query";

@Injectable({providedIn: 'root'})
export class  OrderService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: OrdersStore,
    protected _query: OrdersQuery
  ) {
    super(_http, _log, _store);
    this.baseURL += 'orders-api/v1/';
  }

  loadOrders(): void {
    this.get('backoffice/orders' + this._query.queryString + '&status=DA_FATTURARE', true).subscribe();
  }
}
