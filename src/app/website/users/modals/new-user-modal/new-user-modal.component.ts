import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {toMoment} from "../../../../core/utils/functions";
import {Observable, of} from "rxjs";
import {debounceTime, filter, mergeAll, startWith, tap} from "rxjs/operators";
import {RegistrationService} from "../../services/registration.service";
import {City, RegisterUserDTO} from "../../../../core/models/registration.models";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PartnersService} from "../../../partners/services/partners.service";
import {PartnerQuery} from "../../../../core/stores/partners/partner.query";
import {LogService} from "../../../../core/services/log.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArrayLengthOneValidator} from "../../../../core/utils/validators";
import {HealthpointService} from "../../services/healthpoint.service";
import {Locations} from "../../../../core/models/locations";
import {BaseUser, User} from "../../../../core/models/user.model";

@Component({
  selector: 'hpb-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit {


  partners$ = this._partners.selectAll();
  role: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  phonePrefixes$ = this._registrationService.getPhonePrefixes();
  filteredCities$: Observable<City[]> | undefined;

  locations: Locations[] = [];
  roles: {role: string, needLocation: boolean}[] = [];
  showLocation = false;

  isLoading = false;


  userForm = new FormGroup({

    userId: new FormControl(''),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),

    birthDate: new FormControl(''),
    birthPlace: new FormControl(''),
    fiscalCode: new FormControl(''),

    email: new FormControl('', Validators.required),
    phonePrefix: new FormControl('+39', Validators.required),
    phoneNumber: new FormControl('', Validators.required),

    role: new FormControl('', Validators.required),
  });

  maxDate = toMoment().subtract(18, 'year').toDate();

  private get userDTO(): RegisterUserDTO {
    const consent: any = {};
    const user = {
      ...this.userForm.value,
      phoneNumber: this.userForm.value.phonePrefix + this.userForm.value.phoneNumber,
      birthDate: (toMoment(this.userForm.value.birthDate).format('YYYY-MM-DD')),
      consent
    };
    delete user.passwordRepeat;
    delete user.phonePrefix;
    delete user.role;
    return user;
  }

  get isNewUser(): boolean {
    return !this.userForm.value.userId;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() private data: BaseUser,
    private _formBuilder: FormBuilder,
    private _log: LogService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialogRef<NewUserModalComponent>,
    private _registrationService: RegistrationService,
    private _hpService: HealthpointService,
    private _partnerService: PartnersService,
    private _partners: PartnerQuery,
    private _userService: UserService,
  ) {
    if(this.data){
      this.name = this.data.name;
      this.surname = this.data.surname;
      this.role = this.data.roles[0];
    }
    if(this.userForm.controls.birthPlace !== null) {
      this.userForm.controls.birthPlace.valueChanges.pipe(
        startWith(''),
        filter((value: any) => !value.id),
        debounceTime(500),
        tap((value: string) => this.filteredCities$ = this._registrationService.searchCity(value))
      ).subscribe();
    }
    if (data) {
      this._log.log(data);
      this.userForm.patchValue({
        ...data,
        role: data.roles[0],
        phonePrefix: data.phoneNumber[0] === '+' ? data.phoneNumber.slice(0, 3) : '+39',
        phoneNumber: data.phoneNumber[0] === '+' ? data.phoneNumber.slice(3) : data.phoneNumber
      });
      if (data.locations.length > 0) {
        this.userForm.addControl('locationIds', new FormControl(data.locations[0].id, Validators.required));
        this.getLocations();
      //  this.showLocation = true;
      }
    }
    if (this.isNewUser) {
      this.userForm.addControl('role', new FormControl('', Validators.required));
    }

  }

  ngOnInit(): void {
    this._partnerService.getPartners();
    if (!this.data) {
      this.loadRoles();
    }
  }

  async loadRoles(): Promise<void> {
    this.roles = await this._userService.loadRoles().toPromise();
  }

  async getLocations(): Promise<void> {
    this.locations = await this._hpService.getLocations().toPromise();
  }

  calculateFiscalCode(): void{
    const form = this.userForm.value;
    form.birthDate = toMoment(form.birthDate).format('yyyy-MM-DD');
    this._userService.fiscalCodeCalculate(form).subscribe(
      (res: any) => this.userForm.get('fiscalCode')?.setValue(res),
      (error: any) => this._snackBar.open('Errore nel calcolo del Codice Fiscale.')
    );
  }

  checkLocationField(role: any): void {
    console.log('roles',role);
    if (role.needLocation) {
      if (!this.showLocation) {
        this.userForm.addControl('locationIds', new FormControl('', Validators.required));
        this.getLocations();
      }
    } else {
      this.userForm.removeControl('locationIds');
    }
    this.showLocation = role.needLocation;
  }

  createUser(): void {
    this.isLoading = true;
    const call = this.isNewUser ? this._userService.createUser(this.userDTO, this.userForm.value.role) : this._userService.modifyUser(this.userDTO, this.userForm.value.role);
    call.subscribe(
      success => {
        this._dialog.close(true);
        this._snackBar.open('Utente ' + (this.isNewUser ? 'creato' : 'modificato') + ' con successo.', 'OK');
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this._snackBar.open(error.messaggio);

      }
    );
  }

}
