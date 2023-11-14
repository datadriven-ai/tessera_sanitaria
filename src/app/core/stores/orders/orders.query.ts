import {Injectable} from "@angular/core";
import {MetaQuery, QueryState} from "../../classes/meta";
import {OrdersStore} from "./orders.store";
import {Order} from "../../models/order";

@Injectable({providedIn: 'root'})
export class OrdersQuery extends MetaQuery<QueryState, Order> {

  constructor(protected store: OrdersStore) {
    super(store);
  }
}
