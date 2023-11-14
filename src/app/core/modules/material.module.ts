import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatBadgeModule} from "@angular/material/badge";
import {getItalianPaginatorIntl} from "../classes/ita-paginator";

const COMPONENTS = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatStepperModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatTabsModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatBadgeModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {autoFocus: false, hasBackdrop: true, disableClose: true}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 6000}},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_DATE_LOCALE, useValue: 'it'},
    { provide: MatPaginatorIntl, useValue: getItalianPaginatorIntl() }
  ]
})
export class MaterialModule { }
