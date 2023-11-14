import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseUser, USER_ROLES} from "../../../../core/models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {AssociateMedicsComponent} from "../../modals/associate-medics/associate-medics.component";
import {UserService} from "../../services/user.service";
import {MedicService} from "../../services/medic.service";

@Component({
  selector: 'hpb-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  @Input() user: BaseUser | undefined;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() changeInfo = new EventEmitter();
  phone: string | undefined;
  specializations: string[] =[];

  get isSecretary(): boolean {
    return this.user && this.user.roles ? this.user.roles.includes(USER_ROLES.SECRETARY) : false;
  }

  constructor(
    private _dialog: MatDialog,
    private _medicService: MedicService,
  ) {}

  ngOnInit() {
    this.phone = this.user?.phoneNumber ? this.user.phoneNumber.substring(3) : '';
    if(this.user?.specializations !== null){
      this.user?.specializations.forEach(t => {
        this.specializations.push( ' ' + t.toLowerCase());
      })
    }
  }

  openSecretarySettings(): void{
   this.changeInfo.emit();
  }

}
