import { Store, StoreConfig } from '@datorama/akita';
import {SessionState, UserInfo} from "../../models/session";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<UserInfo> {
  constructor() {
    super({});
  }
}
