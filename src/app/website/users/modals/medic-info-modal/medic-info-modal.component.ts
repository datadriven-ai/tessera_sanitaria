import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {City} from "../../../../core/models/registration.models";
import {BaseUser, Branch, Medic} from "../../../../core/models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {debounceTime, filter, startWith, tap} from "rxjs/operators";
import {MedicService} from "../../services/medic.service";
import {PartnersService} from "../../../partners/services/partners.service";
import {PartnerQuery} from "../../../../core/stores/partners/partner.query";

@Component({
  selector: 'hpb-medic-info-modal',
  templateUrl: './medic-info-modal.component.html',
  styleUrls: ['./medic-info-modal.component.scss']
})
export class MedicInfoModalComponent implements OnInit {

  filteredCities$: Observable<City[]> | undefined;

  form: FormGroup = this.formBuilder.group({

    userId: null,
    professionTitle: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    associatedChannel: [[], Validators.required],
    cap: ['', Validators.required],
    city: ['', Validators.required],
    creationDate: ['', Validators.required],
    email: ['', Validators.required],
    enabled: [true, Validators.required],
    fiscalCode: ['', Validators.required],
    gender: ['', Validators.required],
    hasAvailabilities: [false, Validators.required],
    specializations: [[], Validators.required],
    visitType: [[], Validators.required],
    roles: [[], Validators.required],
    nationalDtRegCertificate: ['', Validators.required],
    nationalRegCertificate: ['', Validators.required],
    nationalRegCertificateName: ['', Validators.required],
    nationalRegCertificateCode: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    qualification: ['', Validators.required],
    qualificationClassLevel: ['', Validators.required],
  });

  compareWithF = (a: any, b: any) => a && b ? a === b.id : a ===b ;
  medic: Medic| undefined;
  isLoading = false;
  allBranches: Branch[]| undefined;
  visitType: string[]| undefined;
  conventions: any[]| undefined;
  enabled: boolean| undefined;

  compareVisitType(o1: any, o2: any): boolean {
    return o1.id === o2.channelId;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: Medic,
    private _userService: UserService,
    private _partners: PartnerQuery,
    private _medicService: MedicService,
    private _partnersService: PartnersService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<MedicInfoModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.form.controls.city.valueChanges.pipe(
      filter(value => !value.id),
      startWith(''),
      debounceTime(500),
      tap((value: string) => this.filteredCities$ = this._userService.searchCity(value))
    ).subscribe();
  }

  ngOnInit(): any{
    this.getAllBranches();
    this.getVisitType();
    this.getConventions();
    this._userService.getDetailsUser(this.data).subscribe(res=>{
      this.form.patchValue(res);
    });
    this.isLoading = true;
  }

  getAllBranches(): any {
    this._medicService.getAllBranch().subscribe((res: Branch[] | undefined) => {
      this.allBranches = res;
    });
  }

  getVisitType(): any {
    this._medicService.getVisitType().subscribe((res: any[] | undefined) => {
      this.visitType = res;
    });
  }

  getConventions(): any {
    this._partnersService.getAllPartners().subscribe((res: any[] | undefined) => {
      this.conventions = res;
      }
    )

  }


  save(): void{
  }
}
