import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {Order} from "../../models/order";

@StoreConfig({ name: 'orders'})
@Injectable({providedIn: 'root'})
export class OrdersStore extends EntityStore<QueryState, Order> {
  constructor() {
    super(getEmptyMeta());
  }
}
