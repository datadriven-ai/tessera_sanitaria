import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Partner} from "../../../../core/models/partner";

@Component({
  selector: 'hpb-partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.scss']
})
export class PartnerCardComponent{

 @Input() partner: Partner | undefined;
 @Output() openCatalog = new EventEmitter();
 @Output() editClicked = new EventEmitter();
 @Output() importClicked = new EventEmitter();

 get canImport(): boolean {
   return this.partner ? this.partner.registrationType === 'PRE' : false;
 }

}
