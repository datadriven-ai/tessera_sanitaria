import {Injectable} from "@angular/core";
import {BaseService} from "../../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../../core/services/log.service";
import {UserStore} from "../../../core/stores/users/user.store";
import {UserQuery} from "../../../core/stores/users/user.query";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class MedicService extends BaseService {

  constructor(
    protected _http: HttpClient,
    protected _log: LogService,
    protected _store: UserStore,
    protected _query: UserQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += 'medics-api/v1/';
  }

  getAllBranch(): any{
    return this.get('backoffice/branches' );
  }

  getVisitType(): any {
    return this.get('backoffice/visit_type');
  }


  associateMedicsToSecretary(secretaryId: number, medicIds: number[]): Observable<any> {
    return this.put('medic/association/' + secretaryId, medicIds);
  }
}
