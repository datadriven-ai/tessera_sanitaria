import {Component, OnInit} from '@angular/core';
import {SessionQuery} from "../../core/stores/session/session.query";
import {Router} from "@angular/router";
import {LogService} from "../../core/services/log.service";
import {AuthService} from '../../core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'hpm-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  private user$ = this._user.user$;
  disableLogin = this._session.isLoginDisabled$;

  constructor(
      private _session: SessionQuery,
      private _router: Router,
      private _log: LogService,
      private _auth: AuthService,
      private _user: SessionQuery,
  ) {
    this.user$.pipe(untilDestroyed(this)).subscribe(user => {
      if (this._auth.isLogged) {
        this._log.log('[Auth] is Logged. Redirecting to dashboard');
        this._router.navigateByUrl('/reservations');
      } else {
        this._log.log('[Auth] is not logged.');
      }
    });
  }

  login(): void {
    this._auth.login();
  }

}
