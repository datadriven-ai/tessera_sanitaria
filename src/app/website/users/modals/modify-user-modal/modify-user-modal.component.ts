import {Component, Inject, OnInit, Optional} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseUser, Convention, User} from "../../../../core/models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../services/registration.service";
import {toMoment} from "../../../../core/utils/functions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {City, RegisterUserDTO} from "../../../../core/models/registration.models";
import {Observable} from "rxjs";

@Component({
  selector: 'hpb-modify-user-modal',
  templateUrl: './modify-user-modal.component.html',
  styleUrls: ['./modify-user-modal.component.scss']
})
export class ModifyUserModalComponent implements OnInit {
  conventions: Convention[] | undefined;
  phonePrefixes$ = this._registrationService.getPhonePrefixes();
  filteredCities$: Observable<City[]> | undefined;
  isLoading = false;
  isLoadingPage = false;
  reservation: User | undefined;
  userForm = new FormGroup({

    userId: new FormControl(''),
    name: new FormControl({value: '', disabled: true}, Validators.required),
    surname: new FormControl({value: '', disabled: true}, Validators.required),
    gender: new FormControl('', Validators.required),

    birthDate: new FormControl(''),
    birthPlace: new FormControl({value: '', disabled: true}),
    fiscalCode: new FormControl({value: '', disabled: true}),

    email: new FormControl('', Validators.required),
    phonePrefix: new FormControl('+39', Validators.required),
    phoneNumber: new FormControl('', Validators.required),

    convention: new FormControl(null, Validators.required),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() private data: User,
    private _userService: UserService,
    private _dialog: MatDialogRef<ModifyUserModalComponent>,
    private _snackBar: MatSnackBar,
    private _registrationService: RegistrationService,
  ) { }

  ngOnInit(): void {
    this.isLoadingPage = true;
    this._userService.getDetailsUser(this.data).subscribe(res => {
      this.reservation = res;
      this.isLoadingPage = false;
      this.userForm.patchValue({
        ...res,
        phonePrefix: res.phoneNumber[0] === '+' ? res.phoneNumber.slice(0, 3) : '+39',
        phoneNumber: res.phoneNumber[0] === '+' ? res.phoneNumber.slice(3) : res.phoneNumber
      });
      this._userService.getConventionUser(res.channelId).subscribe(convention =>{
        this.userForm.get('convention')?.setValue(convention.id);
      });
    });
    this._userService.getConventions().subscribe(res=> this.conventions = res );
  }


  calculateFiscalCode(): void{
    const form = this.userForm.value;
    form.birthDate = toMoment(form.birthDate).format('yyyy-MM-DD');
    this._userService.fiscalCodeCalculate(form).subscribe(
      (res: any) => this.userForm.get('fiscalCode')?.setValue(res),
      (error: any) => this._snackBar.open('Errore nel calcolo del Codice Fiscale.')
    );
  }

  modifyUser(): void {
    //  {"userId":100250,"name":"Danilo","surname":"Coll Secretary","gender":"M","birthDate":"2000-01-01",
    //   "birthPlace":"Roma","fiscalCode":"NSHMRC00A01H501V","email":"kebrollatroitri-5720@yopmail.com","phoneNumber":"+3933322114555","consent":{}}
    this.isLoading = true;
    const userDTO =  {
      userId: this.userForm.value.userId,
      name: this.userForm.value.name,
      surname: this.userForm.value.surname,
      gender: this.userForm.value.gender,
      birthDate: (toMoment(this.userForm.value.birthDate).format('YYYY-MM-DD')),
      fiscalCode: this.userForm.value.fiscalCode,
      email: this.userForm.value.email,
      phoneNumber: this.userForm.value.phonePrefix + this.userForm.value.phoneNumber,
      birthPlace: this.reservation?.birthPlace,
      channelId: this.userForm.value.convention,
      consent: {}
    }
   const call =  this._userService.modifyUser( userDTO, 'user')
    call.subscribe(
      success => {
        this._dialog.close(true);
        this._snackBar.open('Utente modificato con successo.', 'OK');
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this._snackBar.open(error.error.messaggio);
      }
    );
  }


}
