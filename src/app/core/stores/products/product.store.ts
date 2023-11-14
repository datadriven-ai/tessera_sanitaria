import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, MetaQuery, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {CatalogItem} from "../../models/products";

@StoreConfig({ name: 'products', idKey: 'category'})
@Injectable({providedIn: 'root'})
export class ProductStore extends EntityStore<QueryState, CatalogItem> {
    constructor() {
        super(getEmptyMeta());
    }
}
