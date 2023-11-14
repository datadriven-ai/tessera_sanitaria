import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Order} from "../../../../core/models/order";

@Component({
  selector: 'hpb-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input() order: Order | undefined;
  @Output() generateInvoiceEvent = new EventEmitter();

}
