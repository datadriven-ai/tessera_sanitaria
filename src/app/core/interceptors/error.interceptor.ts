import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LogService} from "../services/log.service";
import {AuthService} from "../services/auth.service";
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private _log: LogService,
        private _auth: AuthService,
        private _router: Router,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                switch (err.status) {
                    case 403:
                    case 401:
                        this._log.error('[ERROR Interceptor]: ' + err.status + ' Unauthorized');
                        this._auth.logout();
                        this._router.navigateByUrl('/');
                        break;
                    default:
                        this._log.error('[ERROR Interceptor]: ' + err.status);
                        break;
                }
                return throwError(err);
         }));
    }
}
