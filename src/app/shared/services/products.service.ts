import {Injectable} from "@angular/core";
import {BaseService} from "../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../core/services/log.service";
import {ProductStore} from "../../core/stores/products/product.store";
import {Observable} from "rxjs";
import {CatalogItem, Product} from "../../core/models/products";

@Injectable({providedIn: 'root'})
export class ProductService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: ProductStore,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'products-api/v1/product/';
  }

  loadProducts(): void {
    this.get( 'category_catalog', true);
  }

  loadAgreementBaseProducts(channelId: number): Observable<CatalogItem[]> {
    return this.get( channelId + '/catalog', true);
  }

  loadStrategyCatalog(channelId: number, strategyId: number) : Observable<CatalogItem[]> {
    return this.get( 'category_catalog/campaign/'+strategyId + '/' + channelId, true);
  }

  loadBasicProducts(): void {
    this.get('category_catalog/generic', true).subscribe();
  }

  loadAgreementProducts(channelId: number): Observable<Product[]> {
    return this.get(channelId + '/products', false)
  }

  getProductPromo(id: number) {
    return this.get('promo/' + id + '/products');
  }

}
