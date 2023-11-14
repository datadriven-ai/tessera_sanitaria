import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AuthConfig,
  OAuthEvent,
  OAuthService, OAuthStorage,
} from "angular-oauth2-oidc";
import {environment} from '../../../environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import * as Moment from 'moment';
import {SessionStore} from "../stores/session/session.store";
import {SessionQuery} from "../stores/session/session.query";
import {LogService} from "./log.service";
import jwtDecode from "jwt-decode";
import {UserService} from "../../website/users/services/user.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private custom_token: string | null = environment.customToken;

  private authConfig: AuthConfig = {
    issuer: environment.authServer,
    requireHttps: environment.production,
    redirectUri: window.location.origin + '/login',
    clientId: environment.clientID,
    scope: 'profile email',
    showDebugInformation: environment.production,
    skipIssuerCheck: true,
    strictDiscoveryDocumentValidation: false
  };

  get isLogged(): boolean {
    return this._oauthService.hasValidAccessToken();
  }

  get token(): string {
    return this._oauthService.getAccessToken();
  }

  get userId(): number {
    return this._sessionQuery.user.userId;
  }

  get editURL(): string {
    return environment.authServer + 'account?referrer=' + environment.clientID + '&redirect_uri=' + encodeURIComponent(window.location.origin);
  }

  constructor(
    private _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _oauthService: OAuthService,
    private _oAuthStorage: OAuthStorage,
    private _router: Router,
    private _sessionQuery: SessionQuery,
    private _userService: UserService,
    private _session: SessionStore,
    private _log: LogService
  ) {
    this._oauthService.events.subscribe(e => this.eventHandler(e));
    if (this.custom_token && !environment.production) {
      this._log.log('[Auth Service] Set Token: ' + this.custom_token);
      this._log.log(jwtDecode(this.custom_token));
      this._oAuthStorage.setItem('access_token', this.custom_token);
      this._oAuthStorage.setItem('expires_in', '1621382253');
    }
  }

  private async configure(): Promise<void> {
    this._oauthService.configure(this.authConfig);
    await this._oauthService.loadDiscoveryDocumentAndTryLogin();
    await this.setUserInfo();
  }

  private async setUserInfo(): Promise<void> {
    if (this._oauthService.hasValidAccessToken()) {
      this._log.log('[Auth Service] expiration date: ' + Moment(this._oauthService.getAccessTokenExpiration()).format('LLL'));
      this._userService.getUserInfo();
    } else {
      this._log.log('[Auth Service] JTW Token non più valido.');
      this.logout();
    }
  }

  async connect() {
    await this.configure();
  }

  async login() {
    this._oauthService.initImplicitFlow();
  }

  logout(): void {
    this._oauthService.logOut();
    this._router.navigate(['']);
  }

  private async eventHandler(event: OAuthEvent) {
    switch (event.type) {
      case 'token_expires':
        this._log.log('[KeyCloak] Token expired');
        break;
      case 'token_received':
        this._log.log('[KeyCloak] Token received');
        await this._router.navigate(['']);
        break;
      case 'token_refresh_error':
        this._log.log('[KeyCloak] Refresh Error');
        this.logout();
        break;
      case 'discovery_document_load_error':
        this._log.log('[KeyCloak] KeyCloak non raggiungibile.');
        this._session.update({canLogin: false});
        this.logout();
        break;
      case 'silent_refresh_timeout':
        break;
      case 'discovery_document_loaded':
        if ((event as any).info) {
          this._session.update({canLogin: true});
          this._log.log('[KeyCloak] KeyCloak connesso.');
        }
        break;
      default:
        this._log.log('[KeyCloak Event] ' + event.type);
    }

  }


}
