import {QueryEntity} from '@datorama/akita';
import {Meta, PaginationRequest, PaginationResponse, Sort} from '../models/responseMeta';
import {Observable} from "rxjs";

export interface QueryState {
  sort: Sort | undefined;
  pagination: PaginationRequest;
  paginationResponse?: PaginationResponse | undefined;
  text: string | undefined;
}

export class MetaQuery<State extends QueryState, Entity> extends QueryEntity<State, Entity> {

  protected queryExceptions = ['page'];

  meta$ = this.select(state => state);
  pagination$: Observable<PaginationResponse | undefined> = this.select('paginationResponse');
  sort$ = this.select('sort');

  get meta(): any {
    const meta = this.getValue();
    return {
      text: meta.text,
      page: meta.pagination.page,
      size: meta.pagination.size,
    };
  }

  get queryString(): string {
    let q = '?';
    Object.entries(this.meta).forEach(values => q += values[1] || this.queryExceptions.includes(values[0]) ? values[0] + '=' + values[1] + '&' : '');
    return q.slice(0, -1);
  }

  resetMeta(): void {
    const meta: any = getEmptyMeta();
    this.store.update({...meta});
  }


  resetStore(): void {
    this.resetActive();
    this.resetMeta();
    this.resetError();
    this.store.set([]);
  }

  resetError(): void {
    this.store.setError(null);
  }

  setLoading(isLoading: boolean): void {
    this.store.setLoading(isLoading);
  }


  updateMeta(field: string, value: any): void  {
    this.store.update(this.changeMeta(field, value));
  }

  resetActive(): void {
    this.store.removeActive(this.getActiveId());
  }

  private changeMeta(field: string, value: any[] | Sort[] | PaginationResponse | string | any): any {
    const meta: any = {...this.getValue()};
    meta[field] = value;
    return meta;
  }
}

export function getEmptyMeta(): QueryState {
  return {
    text: undefined,
    sort: undefined,
    pagination: {
      page: 0,
      size: 10,
    }
  };
}
