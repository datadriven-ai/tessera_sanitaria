import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {CatalogItem, Product} from "../../models/products";
import {ProductStore} from "./product.store";
import {map} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class ProductQuery extends MetaQuery<QueryState, CatalogItem> {

  get products(): Product[] {
    let p: Product[] = []
    this.getAll().forEach(c => p = p.concat(c.products));
    return p;
  }

    constructor(protected store: ProductStore) {
        super(store);
    }
}
