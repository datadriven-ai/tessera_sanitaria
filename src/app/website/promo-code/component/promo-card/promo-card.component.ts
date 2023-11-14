import {Component, Input, EventEmitter, Output} from '@angular/core';
import {PromoCode} from "../../../../core/models/promoCode";
import {PromotionsService} from "../../services/promotions.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'hpb-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent {

  @Input() promoCode: PromoCode | undefined;
  @Output() editClicked = new EventEmitter();

  constructor(
    private promoService: PromotionsService,
    private snackBar: MatSnackBar
  ) {
  }

  deletePromo(promo: PromoCode | undefined){
    this.promoService.deletePromoCode(promo).subscribe(res => {
      this.promoService.getPromotions();
    },error => {
      this.snackBar.open('impossibile eliminare il codice sconto ');
    })
  }
}
