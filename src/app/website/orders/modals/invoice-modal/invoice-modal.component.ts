import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../../core/models/order";
import {OrderService} from "../../services/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceService} from "../../services/invoice.service";
import {Observable} from "rxjs";
import {City, Nation} from "../../../../core/models/registration.models";
import {debounceTime, filter, startWith, tap} from "rxjs/operators";
import {UserService} from "../../../users/services/user.service";

@Component({
  selector: 'hpb-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss']
})
export class InvoiceModalComponent {

  isLoading = false;
  filteredCities$: Observable<City[]> | undefined;
  filteredNation$: Observable<Nation[]> | undefined;
  filteredProvince$: Observable<City[]> | undefined;

  get isCompany(): boolean {
    return this.accountHolder.value.accountHolderType === 'PG';
  }

  accountHolder = this._form.group({
    address: ['', Validators.required],
    cap: ['', Validators.required],
    city: ['', Validators.required],
    nation: ['', Validators.required],
    province: ['', Validators.required],
    email: '',
    accountHolderType: ['PF', Validators.required],
    debtNote: '',
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<InvoiceModalComponent>,
    private _snack: MatSnackBar,
    private _form: FormBuilder,
    private _invoiceService: InvoiceService,
  ) {
    this.changeHolderType('PF');
    this.accountHolder.patchValue(this.order.user);
    this.accountHolder.controls.city.valueChanges.pipe(
      filter(value => !value.id),
      startWith(''),
      debounceTime(500),
      tap((value: string) => this.filteredCities$ = this._userService.searchCity(value))
    ).subscribe();
    this.accountHolder.controls.nation.valueChanges.pipe(
      filter(value => !value.id),
      startWith(''),
      debounceTime(500),
      tap((value: string) => this.filteredNation$ = this._userService.searchCountry(value))
    ).subscribe(res => console.log(res));
    this.accountHolder.controls.province.valueChanges.pipe(
      filter(value => !value.id),
      startWith(''),
      debounceTime(500),
      tap((value: string) => this.filteredProvince$ = this._userService.searchCity(value))
    ).subscribe(res => console.log(res));
  }

  changeHolderType(type: string): void {
    if (type === 'PF') {
      this.accountHolder.removeControl('partitaIva');
      this.accountHolder.removeControl('companyName');
      this.accountHolder.addControl('name', new FormControl('', Validators.required));
      this.accountHolder.addControl('surname', new FormControl('', Validators.required));
      this.accountHolder.addControl('fiscalCode', new FormControl('', Validators.required));
    } else {
      this.accountHolder.removeControl('fiscalCode');
      this.accountHolder.removeControl('name');
      this.accountHolder.removeControl('surname');
      this.accountHolder.addControl('partitaIva', new FormControl('', Validators.required));
      this.accountHolder.addControl('companyName', new FormControl('', Validators.required));
    }
    this.accountHolder.get('accountHolderType')!.setValue(type);
  }

  generate(): void {
    this.isLoading = true;
    this._invoiceService.emitInvoice(this.order.id, this.accountHolder.value).subscribe(
      success => {
        this.isLoading = false;
        this._dialogRef.close(true);
        this._snack.open('Fattura generata e inviata.');
      },
      error => {
        this.isLoading = false;
        this._snack.open('Impossibile generare la fattura: ' + error.messaggio);
      }
    )
  }

}
