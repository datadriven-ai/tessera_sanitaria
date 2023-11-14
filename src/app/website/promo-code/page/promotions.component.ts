import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {PromotionQuery} from "../../../core/stores/promo-codes/promotion.query";
import {PromotionsService} from "../services/promotions.service";
import {MatDialog} from "@angular/material/dialog";
import {NewPromoModalComponent} from "../modal/new-promo-modal/new-promo-modal.component";
import {PromoCode} from "../../../core/models/promoCode";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'hpb-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent extends BaseListComponent  implements OnInit {

  @ViewChild('paginator') private paginator: MatPaginator | undefined;

  tabs = ['Coupon', 'Codici promozionali', 'Terminati'];

  constructor(
    private _dialog: MatDialog,
    private _promotions: PromotionQuery,
    private _promotionService: PromotionsService,
  ) {
    super(_promotions);
    this._promotions.updateMeta('type', 'COUPON');
  }

  loadEntities(): void {
    this._promotionService.getPromotions();
  }

  async openNewCodeModal(promoCode?: PromoCode): Promise<void> {
    const refresh = await this._dialog.open(NewPromoModalComponent, {height: '750px', data: promoCode}).afterClosed().toPromise();
    if (refresh) {
      this.loadEntities();
    }
  }

  changeTab(i: number): void {
    this.paginator!.pageIndex = 0;
    this._promotions.updateMeta('isActive', true);
    this._promotions.resetMeta();
    switch (i) {
      case 0:
        this._promotions.updateMeta('type', 'COUPON');
        break;
      case 1:
        this._promotions.updateMeta('type', 'PROMO');
        break;
      case 2:
        this._promotions.updateMeta('type', null);
        this._promotions.updateMeta('isActive', false);
    }
    this.loadEntities();
  }

}
