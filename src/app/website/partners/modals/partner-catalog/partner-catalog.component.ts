import {Component, Inject, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../shared/services/products.service";
import {ProductQuery} from "../../../../core/stores/products/product.query";
import {CatalogItem, Product} from "../../../../core/models/products";
import {SelectionModel} from "@angular/cdk/collections";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Partner} from "../../../../core/models/partner";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductBOService} from "../../../../shared/services/productBackoffice.service";
import {SelectionModelExtended} from "../../../../core/classes/SelectionModelExtended";

@Component({
  selector: 'hpb-partner-catalog',
  templateUrl: './partner-catalog.component.html',
  styleUrls: ['./partner-catalog.component.scss']
})
export class PartnerCatalogComponent implements OnInit {

  isLoading$ = this._products.selectLoading();
  catalog$ = this._products.selectAll().pipe(tap(catalog => this.checkExistingProducts(catalog)));

  selectedProducts = new SelectionModelExtended<any>(true);
  productsFormArray: FormArray = this._formBuilder.array([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() private data: Partner,
    private _snack: MatSnackBar,
    private _ref: MatDialogRef<PartnerCatalogComponent>,
    private _productBoService: ProductBOService,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _products: ProductQuery
  ) { }

  ngOnInit(): void {
    this._products.resetStore();
    this._productService.loadBasicProducts();
  }

  async checkExistingProducts(catalog: CatalogItem[]): Promise<void> {
    if (this.data && catalog.length > 0) {
      this._products.setLoading(true);
      const existing = await this._productService.loadAgreementProducts(this.data.channelId).toPromise();
      const products = this._products.products;
      this.productsFormArray.clear();
      existing.forEach(product => {
        this.productChecked({product, checked: true});
        this.selectedProducts.select(products.find(p => p.id === product.id));
      });
      this._products.setLoading(false);
    }
  }

  get productForm(): FormGroup {
    return this._formBuilder.group({
      id: null,
      position: [0 , Validators.required],
      price: ['', Validators.min(0)],
      description: ['', Validators.required],
      categoryDescription: '',
      productType: ['', Validators.required],
    });
  }

  get formProductIds(): number[] {
    return (this.productsFormArray.value as any[]).map(p => p.id);
  }

  productChecked(event: {product: Product, checked: boolean}): void {
    if (event.checked) {
      const newGroup = this.productForm;
      const productAg = {
        id: event.product.id,
        description: event.product.name,
        price: event.product.price.toFixed(2),
        productType: event.product.type,
        categoryDescription: event.product.categoryDescription,
        position: event.product.orderPosition ? event.product.orderPosition : this.productsFormArray.length + 1,
      };
      newGroup.patchValue(productAg);
      this.productsFormArray.push(newGroup);
    } else {
      const i = this.productsFormArray.controls.findIndex(c => c.get('id')?.value === event.product.id);
      this.productsFormArray.removeAt(i);
    }
  }

  removeProduct(i: number): void {
    this.productsFormArray.removeAt(i);
    this.formProductIds.splice(i);
    this.selectedProducts.deselect(this.selectedProducts.selected[i]);
  }

  sortControls(): void {
    this.productsFormArray = this._formBuilder.array(this.productsFormArray.controls.sort(
      (c1, c2) => c1.value.position < c2.value.position ? -1 : 1
    ));
    let min = 0;
    this.productsFormArray.controls.forEach(c => {
      if (c.value.position === min) {
        c.get('position')!.setValue(c.value.position + 1);
      }
      min = c.value.position ;
    } );
  }

  save(): void {
    this._productBoService.updateCatalog(this.data.channelId, this.productsFormArray.value).subscribe(
      success => {
        this._snack.open('Catalogo aggiornato.');
        this._ref.close();
      },
      error => this._snack.open(error.error)
    );
  }

}
