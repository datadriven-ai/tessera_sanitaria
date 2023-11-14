import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';
import * as Moment from 'moment';

@Component({
  selector: 'hpb-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  @Input() formArray: any;

  @Output() productRemoved = new EventEmitter<number>();
  @Output() weightChanged = new EventEmitter();

  sort() {
    this.weightChanged.emit();
  }

}
