import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatListOption} from "@angular/material/list";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatSelectionListChange} from "@angular/material/list/selection-list";
import {CatalogItem, Product} from "../../../../core/models/products";
import {ProductService} from "../../../../shared/services/products.service";
import {SelectionModelExtended} from "../../../../core/classes/SelectionModelExtended";

@Component({
  selector: 'hpb-products-selection',
  templateUrl: './products-selection.component.html',
  styleUrls: ['./products-selection.component.scss']
})
export class ProductsSelectionComponent {

  @Input() isLoading: boolean | null = true;
  @Input() isCatalog: boolean = true;
  @Input() isActive: boolean | null = true;
  @Input() isLoad: boolean | null = true
  @Input() catalog: CatalogItem[] | null = [];
  @Input() selectedProducts: Product[] = [];
  @Input() selectionModel = new SelectionModelExtended<Product>(true);

  @Output() selectionModelChange: EventEmitter<SelectionModelExtended<Product>> = new EventEmitter<SelectionModelExtended<Product>>();
  @Output() productSelected: EventEmitter<{ product: Product, checked: boolean }> = new EventEmitter<{ product: Product, checked: boolean }>();

  constructor(private _productService: ProductService) {
  }

  itemsChecked(cat: CatalogItem): number {
    if(this.isCatalog){
      const selectedArray = this.selectionModel.selected.map(t=> t.id);
      return cat.products.filter(t => selectedArray.includes(t.id)).length;
    }else{
      const selectedArray = this.selectionModel.selected.map(t=> t.productChannelId);
      return cat.products.filter(t => selectedArray.includes(t.productChannelId)).length;
    }
  }


  check(event: MatSelectionListChange, catId: string) {
    const selection: MatListOption[] = event.source.selectedOptions.selected;
    const products = selection.map(s => s.value);
    this.selectionModel.selected.forEach(p => {
      if (p.categoryDescription === catId) {
        this.selectionModel.deselect(this.isCatalog,p);
      }
    });
   products.forEach(p => this.selectionModel.select(p));
    this.selectionModelChange.emit(this.selectionModel);
  }

  toggleProduct(product: Product, event: MatCheckboxChange) {
    if(event.checked){
      this.selectionModel.select(product);
    }else{
      this.selectionModel.deselect(this.isCatalog, product);
    }
    const selected = this.selectionModel.isSelected(product);
    this.selectionModelChange.emit(this.selectionModel);
    this.productSelected.emit({product, checked: selected});
  }

  selectAll(event: MatCheckboxChange, products: Product[]) {
    products.forEach(p => {
      if(event.checked ) {
        if(this.selectionModel.selected.filter(this.isCatalog ? t => t.id ===p.id : t => t.productChannelId ===p.productChannelId).length ===0){
          this.selectionModel.select(p);
          this.productSelected.emit({product: p, checked: event.checked});
        }
      }else {
        this.selectionModel.deselect(this.isCatalog,p);
        this.productSelected.emit({product: p, checked: event.checked});
      }
    });
    this.selectionModelChange.emit(this.selectionModel);
    if(!this.isCatalog){
      products.forEach(product => this.productSelected.emit({product, checked: event.checked}));
    }
  }

  isSelected(pr: Product) {
      const array = this.selectionModel.selected.filter(t => this.isCatalog ? t.id ===pr.id : t.productChannelId === pr.productChannelId );
      return array.length === 1;
  }
 }
