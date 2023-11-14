import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {PromotionStore} from "../../../core/stores/promo-codes/promotion.store";
import {PromotionQuery} from "../../../core/stores/promo-codes/promotion.query";
import {Observable, of, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import { saveAs } from 'file-saver';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class DocumentService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: PromotionStore,
    protected _snack: MatSnackBar,
  ) {
    super(_http, _log, _store);
  }

  getReports(): Observable<any> {
    return this.get('documents-api/v1/report/sections').pipe(
      catchError(error => of([]))
    );
  }

  download(path: string, filename?: string): void {
    this._http.get(this.baseURL + path, {responseType: 'blob', observe: 'response'}).pipe(
      catchError(error => {
        this._snack.open(error.message);
        return throwError(error);
      })
    ).subscribe(response => {
      const content = response.headers.get('content-disposition');
      const fileName = content ? content.replace('attachment; filename=', '') : filename;
      saveAs(response.body as Blob, fileName);
    });
  }

}
