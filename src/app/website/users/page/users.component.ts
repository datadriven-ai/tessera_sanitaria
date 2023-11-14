import {Component} from '@angular/core';
import {LogService} from "../../../core/services/log.service";
import {MatDialog} from "@angular/material/dialog";
import {UserQuery} from "../../../core/stores/users/user.query";
import {BaseListComponent} from "../../../shared/components/base-components/base-list.component";
import {UserService} from "../services/user.service";
import {NewUserModalComponent} from "../modals/new-user-modal/new-user-modal.component";
import {BaseUser, USER_ROLES} from "../../../core/models/user.model";
import {MedicInfoModalComponent} from "../modals/medic-info-modal/medic-info-modal.component";
import {AssociateMedicsComponent} from "../modals/associate-medics/associate-medics.component";
import {MedicService} from "../services/medic.service";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal/confirm-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModifyUserModalComponent} from "../modals/modify-user-modal/modify-user-modal.component";

@Component({
  selector: 'hpb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseListComponent{

  tabs = Object.entries(USER_ROLES);
  data$ = this._users.selectAll({sortBy: (a, b) => a.surname < b.surname ? -1 : 1})

  constructor(
    private _snackBar: MatSnackBar,
    private _log: LogService,
    private _users: UserQuery,
    private _userService: UserService,
    private _medicService: MedicService,
    private _dialog: MatDialog,
  ) {
    super(_users);
    this._users.updateMeta('role', this.tabs[0][1]);
  }

  loadEntities() {
    this._userService.getUser();
  }

  changeTab(i: number): void {
    this._users.resetMeta();
    this._users.updateMeta('role', this.tabs[i][1]);
    this.loadEntities();
  }

  async openNewUserModal(user?: BaseUser): Promise<void> {
    console.log(user?.roles.find((t: string) => t === 'USER'));
    if(!(user?.roles.find((t: string) => t === 'USER'))){
      const refresh = await this._dialog.open(NewUserModalComponent, {data: user}).afterClosed().toPromise();
      if (refresh) {
        this.loadEntities();
      }
    }
    else{
      const refresh = await this._dialog.open(ModifyUserModalComponent, {
        data: user,
        minWidth:'400px',
      }).afterClosed().toPromise();
      if (refresh) {
        this.loadEntities();
      }
    }
  }

  async delete(user: BaseUser): Promise<void> {
    const confirm = await this._dialog.open(ConfirmModalComponent).afterClosed().toPromise();
    if (confirm) {
      await this._userService.deleteUser(user.userId);
      this.loadEntities();
    }
  }

  async openSecretarySettings(user: BaseUser): Promise<void> {
    const result: any = await this._dialog.open(AssociateMedicsComponent, {data: user.medics}).afterClosed().toPromise();
    if (result) {
      this._medicService.associateMedicsToSecretary(user.userId, result).subscribe(
        success => {
          this.loadEntities();
        }, error => {this._snackBar.open(error);}
      );
    }
  }


}
