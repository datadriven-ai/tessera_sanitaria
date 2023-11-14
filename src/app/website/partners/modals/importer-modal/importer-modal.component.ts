import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../users/services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'hpb-importer-modal',
  templateUrl: './importer-modal.component.html',
  styleUrls: ['./importer-modal.component.scss']
})
export class ImporterModalComponent implements OnInit {

  file: File | undefined;
  overWrite = false;
  isLoading = false;
  hasError = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private conventionId: number,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  fileAdded(f: File): void {
    this.file = f;
  }

  async upload(): Promise<void> {
    this.isLoading = true;
    this.hasError = ! await this._userService.uploadUsersForConvention(this.file!, this.conventionId, this.overWrite).toPromise();
    if(!this.hasError){
      this.snackBar.open('Importazione completata');
    }
    this.isLoading = false;
  }

}
