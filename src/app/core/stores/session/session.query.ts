import { Query } from '@datorama/akita';
import {SessionStore} from './session.store';
import {SessionState, UserInfo} from '../../models/session';
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SessionQuery extends Query<UserInfo> {


  user$ = this.select(store => store.userId ? store : null);
  hasUser$ = this.select(store => !!store.userId);
  isLoginDisabled$ = this.select(store => !store.canLogin)

  get user(): UserInfo {
    return this.getValue();
  }


  constructor(protected store: SessionStore) {
    super(store);
  }


  hasRole(role: 'secretary' | 'medic' | 'admin'): boolean {
    if (!this.user.roles) {return false; }
    switch (role) {
      case "admin":
        return this.user.roles.includes('SECRETARY') && this.user.roles.includes('MEDIC');
      case 'secretary':
        return this.user.roles.includes('SECRETARY');
      case 'medic':
        return this.user.roles.includes('MEDIC');
      default:
        return this.user.roles.includes(role);
    }
  }
}
