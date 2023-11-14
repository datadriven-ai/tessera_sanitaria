import {Injectable} from "@angular/core";
import {getEmptyMeta, MetaQuery, QueryState} from "../../classes/meta";
import {UserStore} from "./user.store";
import {BaseUser} from "../../models/user.model";

export interface UserMeta extends QueryState {
  role: string;
}

@Injectable({providedIn: 'root'})
export class UserQuery extends MetaQuery<UserMeta, BaseUser> {

  get meta(): any {
    return {
      ...super.meta,
      role: this.getValue().role
    };
  }

    constructor(protected store: UserStore) {
        super(store);
    }

  resetMeta(): void {
    const meta: any = getEmptyMeta();
    this.store.update({...meta, pagination: {page: 0, size: 12}});
  }
}
