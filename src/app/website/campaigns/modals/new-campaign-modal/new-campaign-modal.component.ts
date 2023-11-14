import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ArrayLengthOneValidator} from "../../../../core/utils/validators";
import {CatalogItem, Product} from "../../../../core/models/products";
import {Partner} from "../../../../core/models/partner";
import {ProductService} from "../../../../shared/services/products.service";
import {PartnersService} from "../../../partners/services/partners.service";
import {PartnerQuery} from "../../../../core/stores/partners/partner.query";
import {ProductQuery} from "../../../../core/stores/products/product.query";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Campaign} from "../../../../core/models/campaign";
import {LogService} from "../../../../core/services/log.service";
import {tap} from "rxjs/operators";
import {PromotionsService} from "../../../promo-code/services/promotions.service";
import {toMoment} from "../../../../core/utils/functions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewPromoModalComponent} from "../../../promo-code/modal/new-promo-modal/new-promo-modal.component";

@Component({
  selector: 'hpb-new-campaign-modal',
  templateUrl: './new-campaign-modal.component.html',
  styleUrls: ['./new-campaign-modal.component.scss']
})
export class NewCampaignModalComponent implements OnInit {
  idCampaign: number | undefined;
  isAbleToConv: boolean | undefined;
  minDate: Date;
  index: number | undefined;

  partners$ = this._partners.selectAll().pipe(tap(partners => {
    if (this.data.campaign) {
      this.form.get('partners')!.setValue(partners.filter(p => this.data.campaign.channelId.includes(p.channelId)));
    }
  }));

  form = this._fb.group({
    id: null,
    campaignType: [''],
    code: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    partners: [[], ArrayLengthOneValidator],
   // campaignProductsChannel: [[], ArrayLengthOneValidator],
  });

  selectedChannelId: number | undefined;
  strategies: any[] = [];
  catalog$ = this._products.selectAll();

  get isEditing(): boolean {
    return !!this.form.value.id;
  }

  get isStrategy(): boolean {
    return this.form.value.campaignType === 'STRATEGY';
  }

  get isValue(): boolean {
    return this.form.value.campaignType === 'VALUE';
  }

  get hasMultipleAgreementSelected(): boolean {
    return this.form.value.partners.length > 1;
  }

  get selectedAgreements(): Partner[] {
    return this.form.value.partners;
  }

  get hasPercentageSelected(): boolean {
    return this.form.get('valueType')!.value === 'PERCENTAGE';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() private data: {
      campaign: Campaign,
      index: number
    },
    private _log: LogService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewPromoModalComponent>,
    private _snack: MatSnackBar,
    private _productService: ProductService,
    private _partnerService: PartnersService,
    private _promoService: PromotionsService,
    private _partners: PartnerQuery,
    private _products: ProductQuery
  )  {
    this.form.get('partners')!.valueChanges.subscribe(channels => {
      if (channels.length === 1 ) {
        this.loadProducts(channels[0].channelId);
      }
    });

    this.form.get('campaignType')!.valueChanges.subscribe(result =>{
      this.isAbleToConv = result !== null;
    });
    this.index = this.data.index;

      this.minDate = new Date();
  }

  async ngOnInit(): Promise<void> {
    this._partners.updateMeta('pagination', {page: 0, size: 99});
    this._partnerService.getPartners();
    await this.loadStrategies();
    if(this.data.campaign) {
      this._log.log(this.data.campaign);
      this.addFields(this.data.campaign.strategyId ? 'STRATEGY' : 'VALUE');
      this.form.patchValue(this.strategies);
      this.form.patchValue(this.data.campaign);
      this.form.get('campaignType')!.setValue(this.data.campaign.strategyId ? 'STRATEGY' : 'VALUE');
      this.idCampaign = this.form.get('id')?.value;
    }
  }

  addFields(discountType: 'STRATEGY' | 'VALUE'): void {
    if (discountType === 'STRATEGY') {
      this.form.get('campaignType')?.setValue('STRATEGY');
      this.form.addControl('strategyId', new FormControl(this.data.campaign ? this.data.campaign.strategyId!.toString() : '', Validators.required));
      this.form.removeControl('amount');
      this.form.removeControl('valueType');
      if (this.selectedAgreements.length > 0 && this.data.campaign) {
        this.loadProducts(this.selectedAgreements[0].channelId);
      }
    } else {
      this.form.removeControl('strategyId');
      this.form.get('campaignType')?.setValue('VALUE');
      this.form.addControl('amount', new FormControl('1', [Validators.required, Validators.min(1)]));
      if(this.data.campaign){this.form.get('amount')?.setValue(this.data.campaign.value);}
      this.form.addControl('valueType', new FormControl('PERCENTAGE', Validators.required));
      if (this.selectedAgreements.length > 0) {
        this.loadProducts(this.selectedAgreements[0].channelId);
      }
    }
  }

  async loadStrategies(): Promise<void> {
    this.strategies = Object.entries(await this._promoService.retrieveCampaignStrategies().toPromise()).map(e => {
      return {
        id: parseInt(e[0], 10),
        value: e[1]
      }
    });
  }

  async loadProducts(channelId?: number): Promise<void> {
    this.selectedChannelId = channelId ? channelId : this.selectedChannelId;
    if(!this.selectedChannelId){
      return;
    }
    if (this.isStrategy) {
    this.form.value.strategyId ? await this._productService.loadStrategyCatalog( this.selectedChannelId, this.form.value.strategyId).toPromise(): '';
    } else {
      await this._productService.loadAgreementBaseProducts( this.selectedChannelId).toPromise();
    }
  }

  getDiscountedPrice(p: Product): number {
    if (this.form.value.campaignType === 'STRATEGY') {
      return p.discountPrice;
    } else {
      let price = this.form.get('valueType')?.value == 'PERCENTAGE' ?
        p.price - ((p.price / 100) * this.form.get('amount')?.value) :
        p.price -  this.form.get('amount')?.value;
      return price < 0 ? 0 : price;
    }
  }

  save(): void {
    const promoBody = {
      ...this.form.value,
      startDate: toMoment(this.form.value.startDate).format('YYYY-MM-DDTHH:mm:00'),
      endDate: toMoment(this.form.value.endDate).format('YYYY-MM-DDTHH:mm:00'),
      channelIds: this.form.value.partners.map((p: Partner) => p.channelId),
    };
    delete promoBody.partners;
    delete promoBody.campaignType;
    const call = this.isEditing ? this._promoService.updateCampaign(promoBody, promoBody.id, ) : this._promoService.createCampaign(promoBody);
    call.subscribe(
      success => {
        this._snack.open('Campagna ' + (this.isEditing ? 'modificata' : 'creata') + ' con successo', 'OK');
        this._dialogRef.close(true);
      },
      error =>{
        this._snack.open(error.error ? error.error.messaggio: error.messaggio , 'OK')
      }
    )
  }
}
