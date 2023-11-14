import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'hp-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent{

  title = 'Conferma';
  yes = 'Conferma';
  no = 'Indietro';
  content = 'Vuoi confermare la scelta?';

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() config: {[key: string]: string}
  ) {
    if (config){
      this.assign(config);
    }
  }


   assign(config: any | undefined): void {
    Object.keys(config).forEach(key => {
      switch (key) {
        case 'title':
          this.title = config[key]; return;
        case 'yes':
          this.yes = config[key]; return;
        case 'no':
          this.no = config[key]; return;
        case 'content':
          this.content = config[key]; return;
        }
      });
    }


}
