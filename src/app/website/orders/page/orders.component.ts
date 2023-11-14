import { Component, OnInit } from '@angular/core';
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {LogService} from "../../../core/services/log.service";
import {MatDialog} from "@angular/material/dialog";
import {OrdersQuery} from "../../../core/stores/orders/orders.query";
import {OrderService} from "../services/order.service";
import {USER_ROLES} from "../../../core/models/user.model";
import {InvoiceModalComponent} from "../modals/invoice-modal/invoice-modal.component";
import {Order} from "../../../core/models/order";

@Component({
  selector: 'hpb-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseListComponent implements OnInit {

  tabs = ['Ordini', 'Visite'];

  constructor(
    private _log: LogService,
    private _orders: OrdersQuery,
    private _service: OrderService,
    private _dialog: MatDialog,
  ) {
    super(_orders);
  }

  loadEntities() {
    this._service.loadOrders();
  }


  async openInvoiceModal(order: Order): Promise<void> {
    const refresh = await this._dialog.open(InvoiceModalComponent, {data: order}).afterClosed().toPromise();
    if (refresh) {
      this.loadEntities();
    }
  }

}
