import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LogService} from "../services/log.service";
import {AuthService} from "../services/auth.service";

@Injectable() export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _log: LogService,
    private _auth: AuthService

  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.isLogged) {
      return true;
    } else {
      this._router.navigate(['login']);
      this._log.log('[Guard] Token not valid.');
      return false;
    }
  }
}
