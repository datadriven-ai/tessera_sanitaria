import {QueryState} from '../classes/meta';
import {BaseResponse, PaginationResponse} from '../models/responseMeta';
import {catchError, debounceTime, map, share, switchMap, tap} from 'rxjs/operators';
import {Observable, of, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EntityStore, Store} from '@datorama/akita';
import {LogService} from './log.service';
import {environment} from '../../../environments/environment';


export class BaseService {

  protected store: EntityStore<QueryState, any> | Store | undefined;
  protected baseURL = environment.baseURL;

  private isEntityStore(): boolean {
    return !!this.store && this.store instanceof EntityStore;
  }

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store?: EntityStore | Store,
  ) {
    if (_store) {
      this.store = _store;
    }
  }

  protected get(path: string, setStore = false): Observable<any> {
    if (this.store && setStore) {this.store.setLoading(true); }
    return this._http.get<any>(this.baseURL + path).pipe(
      share(),
      catchError(response => {
        if (setStore  && this.isEntityStore) {
          this.store!.setError(this.handleError(response));
          (this.store as EntityStore).set([]);
          this.store!.update({paginationResponse: undefined});
        }
        console.error(response);
        return of([]);
      }),
      map((response: BaseResponse<any>) => {
        this._log.log('[GET]: ' + this.baseURL + path);
        this._log.log(response);
        if (setStore && this.isEntityStore) {
          if (this.isEntityStore()) { this.store!.update({paginationResponse: this.extractPagination(response)}); }
          (this.store as EntityStore).set(response.content ? response.content : response);
          this.store!.setError(false);
        }
        return response && response.content ? response.content : response;
      })
    );
  }

  protected post(path: string, body: any, setStore = false): Observable<any>  {
    this._log.log('[POST]: ' + this.baseURL + path);
    this._log.log(body);
    if (setStore && this.store) { this.store.setLoading(true); }
    return  this._http.post<any>(this.baseURL + path, body).pipe(
      share(),
      catchError(response => {
        if (setStore && this.store) {
          this.store.setError(this.handleError(response));
          this.store.setLoading(false);
        }
        return throwError(response.error);
      }),
      map((response: BaseResponse<any>) => {
        this._log.log('Response: ');
        this._log.log(response);
        return response && response.content ? response.content : response;
      })
    );
  }

  protected put(path: string, body: any = {}, setStore = false): any {
    this._log.log('[PUT]: ' + this.baseURL + path);
    return  this._http.put<any>(this.baseURL + path, body).pipe(
      share(),
      catchError(response => {
        if (setStore  && this.store) { this.store.setError(this.handleError(response));}
        return throwError(response);
      }),
      map((response: BaseResponse<any>) => {
        return response && response.content ? response.content : response;
      })
    );
  }

  protected delete(path: string, setStore = false, id?: number): Observable<any> {
    return this._http.delete(this.baseURL + path).pipe(
      share(),
      tap(response => {
        if (setStore) {
          (this.store as EntityStore).remove(id);
        }}),
      catchError(response => {
        if (this.store) { this.store.setError(this.handleError(response)); }
        return throwError((response && response.error) ? response.error : response);
      })
    );
  }

  private extractPagination(response: BaseResponse<any>): PaginationResponse {
    return {
      totalPages: response.totalPages,
      totalElements: response.totalElements,
      numberOfElements: response.numberOfElements,
      size: response.size,
      number: response.number
    }
  }

  private handleError(response: HttpErrorResponse | any): string {
    this._log.error(response);
    switch (response.status) {
      case 401:
      case 403:
        return 'Errore';
      default:
        return response.error.messaggio;
    }
  }
}
