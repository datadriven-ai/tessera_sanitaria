import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {catchError, map, tap} from "rxjs/operators";
import {UserStore} from "../../../core/stores/users/user.store";
import {UserQuery} from "../../../core/stores/users/user.query";
import {Observable, of, throwError} from "rxjs";
import {City, Nation, RegisterUserDTO} from "../../../core/models/registration.models";
import {UserInfo} from "../../../core/models/session";
import {Partner} from "../../../core/models/partner";
import {AuthService} from "../../../core/services/auth.service";
import {Medic} from "../../../core/models/user.model";

@Injectable({providedIn: 'root'})
export class UserService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: UserStore,
    protected _query: UserQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'users-api/v1/';
  }

  getUserInfo(): void {
    this.get('me').pipe(tap(response => {this._store.update(response);})).subscribe();
  }

  getUser(): void {
    this.get('backoffice/users/role' + this._query.queryString, true)
      .subscribe();
  }

  fiscalCodeCalculate(userForm: any): Observable<string> {
    return this._http.get(this.baseURL + 'public/patient/fiscalcode?surname=' +
      userForm.surname + '&name=' + userForm.name + '&gender=' +
      userForm.gender + '&birthDate=' +  userForm.birthDate + '&city=' + userForm.birthPlace, {responseType: "text"});
  }

  loadRoles(): Observable<any> {
    return this.get('backoffice/users/roles').pipe(catchError(error => of([])));
  }

  createUser(userDTO: RegisterUserDTO, role: string): Observable<UserInfo> {
      return this.post('backoffice/registration/' + role, userDTO).pipe(
        catchError(error => throwError(error))
      );
  }

  modifyUser(userDTO?: any, role?: string): Observable<UserInfo> {
    //  {"userId":100250,"name":"Danilo","surname":"Coll Secretary","gender":"M","birthDate":"2000-01-01",
    //   "birthPlace":"Roma","fiscalCode":"NSHMRC00A01H501V","email":"kebrollatroitri-5720@yopmail.com","phoneNumber":"+3933322114555","consent":{}}
    return this.put('backoffice/update/' + role?.toLowerCase(), userDTO).pipe(
      catchError(error => throwError(error))
    );
  }

  deleteUser(userId: number): Promise<any> {
    return this.delete('backoffice/users/' + userId).toPromise();
  }

  createPartner(partner: Partner): Observable<any> {
    return this.post('backoffice/convention', partner);
  }

  modifyPartner(partner: Partner): Observable<any> {
    return this.put('backoffice/convention', partner);
  }

  getDetailsUser(user: any | undefined) {
    return this.get('' + user?.userId);
  }

  getMedicsByUser(): Promise<Medic[]> {
    return this.get('backoffice/users/role?role=MEDIC&page=0&size=999', false)
      .pipe(catchError(err => of([])))
      .toPromise();
  }

  searchCity(cityName: string | City): Observable<City[]> {
    return this.get(`public/city?search=${cityName}`).pipe(
      catchError(error => of([]))
    );
  }

  searchCountry(nationName: string | Nation): Observable<Nation[]> {
    return this.get(`public/country?search=${nationName}`).pipe(
      catchError(error => of([]))
    );
  }

  getConventionUser(channelId: string){
    return this.get(`channel/id/` + channelId).pipe(
      catchError(error => of([]))
    );
  }

  getConventions(){
    return this.get(`channel`).pipe(
      catchError(error => of([]))
    );
  }

  uploadUsersForConvention(file: File, conventionId: number, overwrite: boolean = false): Observable<any> {
    const data = new FormData();
    data.set('file', file);
    return this.post('backoffice/employees/csv?channelId='+conventionId+'&override='+ overwrite, data).pipe(
      map(res => true),
      catchError(error => of(false)))
  }

}
