import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'hpb-add-email-modal',
  templateUrl: './add-email-modal.component.html',
  styleUrls: ['./add-email-modal.component.scss']
})
export class AddEmailModalComponent{

  domain = new FormControl('', Validators.required);

}
