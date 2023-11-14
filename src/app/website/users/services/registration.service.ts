import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {catchError, map} from "rxjs/operators";
import {UserInfo} from "../../../core/models/session";
import {City, PhoneCountry, PrivacyTerm, RegisterUserDTO} from "../../../core/models/registration.models";

@Injectable({providedIn: 'root'})
export class  RegistrationService extends BaseService{

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
  ) {
    super(_http, _log);
    this.baseURL += 'users-api/v1/public/';
  }

  loadPrivacyTerms(): Observable<PrivacyTerm[]> {
    return this.get(`user/consents`).pipe(
      catchError(error => of([]))
    );
  }

  getPhonePrefixes(): Observable<PhoneCountry[]> {
    return this._http.get<PhoneCountry[]>(`/assets/data/phone-prefix.json`).pipe(
      catchError(error => of([]))
    );
  }

  checkExistingUser(user: RegisterUserDTO): Observable<any> {
    return this.get(`check_user?email=${user.email}&phoneNumber=${user.telephone}&fiscalCode=${user.fiscalCode}`).pipe(
      map(res => false),
      catchError(res => of(res.error))
    );
  }

  searchCity(cityName: string | City): Observable<City[]> {
    return this.get(`city?search=${cityName}`).pipe(
      catchError(error => of([]))
    );
  }


}





