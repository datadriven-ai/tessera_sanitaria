import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilsModule} from '../core/modules/utils.module';
import {MaterialModule} from '../core/modules/material.module';
import {FooterComponent} from './components/footer/footer.component';
import {AddressModalComponent} from './modals/address-modal/address-modal.component';
import {ContactsModalComponent} from './modals/contacts-modal/contacts-modal.component';
import {HasRoleDirective} from '../core/directives/role.directive';
import {OAuthModule} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";
import {ErrorInterceptor} from "../core/interceptors/error.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { MenuComponent } from './components/menu/menu.component';
import {ConfirmModalComponent} from "./modals/confirm-modal/confirm-modal.component";
import {DragDropZoneComponent} from "./components/drag-drop-zone/drag-drop-zone.component";
import {DragDropZone} from "./components/drag-drop-zone/drag-drop.directive";
import {SeparatorPipe} from "../core/pipes/separator.pipe";

const COMPONENTS = [
  FooterComponent,
  AddressModalComponent,
  ContactsModalComponent,
  HasRoleDirective,
  MenuComponent,
  ConfirmModalComponent,
  DragDropZoneComponent,
  DragDropZone
];

const MODULES = [
  UtilsModule,
  MaterialModule,
];

@NgModule({
    declarations: [...COMPONENTS, MenuComponent, SeparatorPipe],
    exports: [...COMPONENTS, MODULES, MenuComponent, SeparatorPipe],
  imports: [
    CommonModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.baseURL],
        sendAccessToken: true
      }
    }),
    ...MODULES
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
})
export class SharedModule { }
