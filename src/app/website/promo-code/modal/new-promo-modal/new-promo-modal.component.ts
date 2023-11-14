import {Component, Inject, OnInit, Optional} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {CatalogItem, Product} from "../../../../core/models/products";
import {FormBuilder, Validators} from "@angular/forms";
import {ArrayLengthOneValidator} from "../../../../core/utils/validators";
import {ProductService} from "../../../../shared/services/products.service";
import {PartnersService} from "../../../partners/services/partners.service";
import {PartnerQuery} from "../../../../core/stores/partners/partner.query";
import {Partner} from "../../../../core/models/partner";
import {ProductQuery} from "../../../../core/stores/products/product.query";
import {Observable} from "rxjs";
import {LogService} from "../../../../core/services/log.service";
import {toMoment} from "../../../../core/utils/functions";
import {PromotionsService} from "../../services/promotions.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PromoCode} from "../../../../core/models/promoCode";
import {debounceTime, tap} from "rxjs/operators";
import {SelectionModelExtended} from "../../../../core/classes/SelectionModelExtended";

@Component({
  selector: 'hpb-new-promo-modal',
  templateUrl: './new-promo-modal.component.html',
  styleUrls: ['./new-promo-modal.component.scss']
})
export class NewPromoModalComponent implements OnInit{
  isActive: boolean = false;
  partners$ = this._partners.selectAll().pipe(tap(partners => {
    this.channelsSelected = partners[0]?.channelId;
    if(this.channelsSelected){
      if (this.data) {
        this.form.get('partners')!.setValue(partners.filter(p => this.data.channelId.includes(p.channelId)));
        this.channelsSelected = partners[0]?.channelId;
      }
      this.loadProducts(this.channelsSelected);
    }
  }));
  isLoading$ = this._products.selectLoading();

  selectionModel = new SelectionModelExtended<Product>(true);
  catalog$: Observable<CatalogItem[]> = this._products.selectAll();
  channelsSelected: number = 0;
  minDate: Date;

  form = this._fb.group({
    id: null,
    type: 'PROMO',
    description: ['', Validators.required],
    code: ['', Validators.required],
    amount: [1, [Validators.required, Validators.min(1)]],
    valueType: ['PERCENTAGE', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    validityStrategy: 'USER',
    cumulative: false,
    maxValidity: 2,
    partners: [[], ArrayLengthOneValidator],
  });

  selectedChannelId: number | undefined;
  discountedProducts: Product[] = [];

  get isEditing(): boolean {
    return !!this.form.value.id;
  }

  get isPromo(): boolean {
    return this.form.value.type === 'PROMO';
  }

  get hasMultipleAgreementSelected(): boolean {
    return this.form.value.partners.length > 1;
  }

  get hasAgreement(): boolean {
    return this.form.value.partners.length > 0;
  }

  get selectedAgreements(): Partner[] {
    return this.form.value.partners;
  }

  get hasPercentageSelected(): boolean {
    return this.form.get('valueType')!.value === 'PERCENTAGE';
  }

  compareWithF = (a: any, b: any) => a && b && a.channelId === b.channelId;

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() private data: PromoCode,
    private _fb: FormBuilder,
    private _log: LogService,
    private _dialogRef: MatDialogRef<NewPromoModalComponent>,
    private _snack: MatSnackBar,
    private _productService: ProductService,
    private _partnerService: PartnersService,
    private _promoService: PromotionsService,
    private _partners: PartnerQuery,
    private _products: ProductQuery
  ) {
    this.minDate = new Date();
    this.isActive = this.data?.isActive;
    this.form.get('maxValidity')!.valueChanges
      .pipe(debounceTime(2000))
      .subscribe(type => {
      if (type === 1) {
        this.form.get('type')!.setValue('COUPON');
      }
    });

    this.form.get('amount')!.valueChanges.subscribe(value =>
      this.discountedProducts = this.discountedProducts.map(p => this.calculateProductDiscount(p)));

    this.form.get('valueType')!.valueChanges.subscribe(value =>
      this.discountedProducts = this.discountedProducts.map(p => this.calculateProductDiscount(p)));

    if (data){
      this._log.log(data);
      this.form.patchValue(data);
      this.form.get('amount')?.setValue(this.data.value);
      this.channelsSelected = this.selectedAgreements[0] ? this.data.channelId[0] : 0;
    }
    this.form.get('partners')?.valueChanges.subscribe(res => {
          if(res ===[]){
            this.selectionModel.clear();
            this.discountedProducts = [];
          }
          const array = res.map((t:any) => t.channelId);
          const a = this.selectionModel.selected.filter(t =>!(array.includes(t.channelId)));
          a.forEach(t => {
            this.selectionModel.deselect(false, t);
          })
          if(!(array.includes(this.channelsSelected))){
           this.channelsSelected = res[0] ? res[0].channelId : 0;
            this.loadProducts(this.channelsSelected);
         }
    });
  }


 async ngOnInit(): Promise<void> {
    this.loadPartners();
    if(this.data){
      this._productService.getProductPromo(this.data.id).subscribe(res => {
        this.selectionModel.select(...res);
        this.loadProducts(this.data.channelId[0]);
      });
    }
  }

  setMaxValidity(type: string): void {
    this.form.get('maxValidity')!.setValue(type === 'COUPON'? 1 : 2);
  }

  private loadPartners(): void {
    this._partners.updateMeta('pagination', {page: 0, size: 999});
    this._partnerService.getPartners();
  }

  async loadProducts(channelId: number): Promise<void> {
    this.selectedChannelId = channelId;
    const catalog = await this._productService.loadAgreementBaseProducts(channelId).toPromise();
    if (this.data) {
      catalog.forEach(c => {
        this.discountedProducts =  this.selectionModel.selected.filter(t=> t.channelId ===  this.selectedChannelId);
        const array = this.selectionModel.selected.map(t => t.productChannelId);
       const products = this.selectionModel.selected.filter(t => !array.includes(t.productChannelId));
        if(products !== []){
          this.selectionModel.select(...products);
        }
      });
    }
    this.calculateDiscount(this.selectedChannelId!);
  }

  productChecked(event: any): void {
      this.calculateDiscount(this.selectedChannelId!);
  }

  calculateProductDiscount(p: Product): Product {
    const product = {...p};
    if (this.form.get('valueType')!.value == 'PERCENTAGE') {
      product.discountPrice = p.price - ((p.price / 100) * this.form.get('amount')!.value);
    } else {
      product.discountPrice = p.price -  this.form.get('amount')!.value;
      if(product.discountPrice < 0) {
        product.discountPrice  = 0;
      }
    }
    return product;
  }

  calculateDiscount(channelId: number): void {
    this.selectedChannelId = channelId;
    this.discountedProducts = this.selectionModel.selected
      .filter(p => p.channelId === channelId).map(p => this.calculateProductDiscount(p));
  }


  save(): void {
    const promoBody = {
      ...this.form.value,
      startDate: toMoment(this.form.value.startDate).format('YYYY-MM-DDTHH:mm:00'),
      endDate: toMoment(this.form.value.endDate).format('YYYY-MM-DDTHH:mm:00'),
      productChannelId: this.selectionModel.selected.map(p => p.productChannelId),
      channelIds: this.form.value.partners.map((p: Partner) => p.channelId),
    };
    delete promoBody.partners;
    const call = this.isEditing ? this._promoService.modifyPromoCode(promoBody.id, promoBody) : this._promoService.createPromoCode(promoBody);
    delete promoBody.id;
    call.subscribe(
      success => {
        this._snack.open('Promozione ' + (this.isEditing ? 'modificata' : 'creata') + ' con successo', 'OK');
        this._dialogRef.close(true);
      },
      error => this._snack.open(error.messaggio, 'OK')
    );
  }

  removeProduct(event: any){
    const convention = this.form.get('partners')?.value.map( (t:any) => t.channelId);
    this.selectionModel.selected.forEach(t =>{
      if(!convention.includes(t.channelId)) {
        this.selectionModel.deselect(t);
      }
    })
  }
}
