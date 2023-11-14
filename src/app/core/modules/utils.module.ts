import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {VisitTypeIconPipe} from '../pipes/visityTypeIcon.pipe';
import {MaterialModule} from "./material.module";
import {TranslateRolePipe} from "../pipes/translateRole.pipe";
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

const MODULES = [
  MaterialModule,
  HttpClientModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule
];

@NgModule({
  declarations: [
    VisitTypeIconPipe,
    TranslateRolePipe
  ],
  imports: [
    CommonModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    TranslateRolePipe,
    VisitTypeIconPipe
  ],
  providers:[
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'it'},
  ]
})
export class UtilsModule { }
