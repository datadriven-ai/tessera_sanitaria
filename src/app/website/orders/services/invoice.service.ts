import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {OrdersStore} from "../../../core/stores/orders/orders.store";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class  InvoiceService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: OrdersStore,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'invoices-api/v1/';
  }

  emitInvoice(orderId: number, accountHolder: any): Observable<any> {
    return this.post('invoice/order/' + orderId, {accountHolder});
  }

}
