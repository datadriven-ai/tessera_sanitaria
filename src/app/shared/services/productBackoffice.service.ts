import {Injectable} from "@angular/core";
import {BaseService} from "../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../core/services/log.service";
import {ProductStore} from "../../core/stores/products/product.store";
import {Observable} from "rxjs";
import {CatalogItem, Product} from "../../core/models/products";
import {debounceTime} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ProductBOService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: ProductStore,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'products-api/v1/backoffice/';
  }

  updateCatalog(channelId: number, catalog: Product[]): Observable<any> {
    return this.put('productChannel/' + channelId, catalog);
  }

}
