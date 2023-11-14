import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Locations} from "../../../core/models/locations";

@Injectable({providedIn: 'root'})
export class HealthpointService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
  ) {
    super(_http, _log);
    this.baseURL += 'healthpoints-api/v1/backoffice/';
  }

 getLocations(): Observable<Locations[]> {
    return this.get('locations').pipe(catchError(error => of([])));
 }
}
