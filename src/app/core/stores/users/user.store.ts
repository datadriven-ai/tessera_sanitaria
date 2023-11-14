import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from "@angular/core";
import {BaseUser} from "../../models/user.model";
import {UserMeta} from "./user.query";

@StoreConfig({ name: 'users', idKey: 'userId'})
@Injectable({providedIn: 'root'})
export class UserStore extends EntityStore<UserMeta, BaseUser> {
    constructor() {
      const meta = getEmptyMeta();
      meta.pagination.size = 12;
      super(meta);
    }
}
