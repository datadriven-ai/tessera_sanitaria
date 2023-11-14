import {Component, Inject, OnInit} from '@angular/core';
import {Medic, User} from "../../../../core/models/user.model";
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {ArrayLengthOneValidator} from "../../../../core/utils/validators";

@Component({
  selector: 'hpb-associate-medics',
  templateUrl: './associate-medics.component.html',
  styleUrls: ['./associate-medics.component.scss']
})
export class AssociateMedicsComponent implements OnInit {

  medics: Medic[] = [];
  isLoading = false;
  formControl = new FormControl([], ArrayLengthOneValidator)

  constructor(
    @Inject(MAT_DIALOG_DATA) private medicIds: number[],
    private _userService: UserService
  ) {
    this.formControl.setValue(this.medicIds);
  }

  ngOnInit(): void {
    this.loadMedics();
  }

  async loadMedics(): Promise<void> {
    this.isLoading = true;
    this.medics = await this._userService.getMedicsByUser();
    this.medics = this.medics.sort((a,b) => a.surname < b.surname ? -1 : 1)
    this.isLoading = false;
  }

}
