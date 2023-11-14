import {Component, Inject, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CatalogItem, Product} from "../../../../core/models/products";
import {SelectionModel} from "@angular/cdk/collections";
import {ProductService} from "../../../../shared/services/products.service";
import {ProductQuery} from "../../../../core/stores/products/product.query";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Partner, PARTNER_TYPE} from "../../../../core/models/partner";
import {AddEmailModalComponent} from "../add-email-modal/add-email-modal.component";
import {UserService} from "../../../users/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as moment from "moment";

@Component({
  selector: 'hpb-new-partner-modal',
  templateUrl: './new-partner-modal.component.html',
  styleUrls: ['./new-partner-modal.component.scss']
})
export class NewPartnerModalComponent implements OnInit {

  hideCatalog = false;
  hideName= false;

  products: Product[] = [];
  productIds: any;

  partnerType = Object.entries(PARTNER_TYPE);

  form = this._formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    conventionCode: ['', Validators.required],
    registrationType: ['', Validators.required],
    twoFactorAuthenticator: ['', Validators.required],
    enabled: [true, Validators.required],
    start:[''],
    end:[''],
    validDomain: [[]],
    invalidDomain: [[]]
  });

  get isModifying(): boolean {
    return !!this.data;
  }

  get validDomains(): string[] {
    return this.form.value.validDomain;
  }

  get invalidDomains(): string[] {
    return this.form.value.invalidDomain;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: Partner,
    private _dialogRef: MatDialogRef<NewPartnerModalComponent>,
    private _snack: MatSnackBar,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _userService: UserService,
  ) {
    if(data) {
      this.form.patchValue(data);
      this.hideName = true;
    //  this.form.get('name')?.disable();
    }
  }

  ngOnInit() {
  }

  async addValidDomain(): Promise<void> {
    const email = await this._dialog.open(AddEmailModalComponent, {width: '350px'}).afterClosed().toPromise();
    if (email) {
      const validDomain = Object.assign([], this.form.get('validDomain')!.value as Array<string>);
      validDomain.push(email);
      this.form.get('validDomain')?.setValue(validDomain);
    }
  }

  removeValidDomain(index: number): void {
    const validDomain = Object.assign([], this.form.get('validDomain')!.value as Array<string>);
    validDomain.splice(index,1);
    this.form.get('validDomain')?.setValue(validDomain);
  }

  async addInvalidDomain(): Promise<void> {
    const email = await this._dialog.open(AddEmailModalComponent, {width: '350px'}).afterClosed().toPromise();
    if (email) {
      const invalidDomain = Object.assign([], this.form.get('invalidDomain')!.value as Array<string>);
      invalidDomain.push(email);
      this.form.get('invalidDomain')?.setValue(invalidDomain);
    }
  }

  removedInvalidDomain(index: number): void {
    const invalidDomain = Object.assign([], this.form.get('invalidDomain')!.value as Array<string>);
    invalidDomain.splice(index,1);
    this.form.get('invalidDomain')?.setValue(invalidDomain);
  }

  save(): void {
    this.form.get('start')?.setValue(moment(this.form.get('start')?.value).format('YYYY-MM-DD'));
    this.form.get('end')?.setValue(moment(this.form.get('end')?.value).format('YYYY-MM-DD'));
   const call = this.isModifying ? this._userService.modifyPartner(this.form.value) :
      this._userService.createPartner(this.form.value);
    call.subscribe(
      success => {
        this._dialogRef.close(true);
         this._snack.open( this.isModifying ? 'Convenzione modificata' : 'Convenzione creata');
      },
      error => {
        this._snack.open(error.messaggio);
      }
    )
  }


}
