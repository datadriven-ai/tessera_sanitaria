import {FormControl} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {MetaQuery} from "../../../core/classes/meta";
import {debounceTime, map, tap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({template: ''})
@UntilDestroy()
export class BaseListComponent implements OnInit{

  searchControl = new FormControl('');

  hasEntity$ = this.query.selectFirst().pipe(map(entity => !!entity));
  count$ = this.query.selectCount();
  data$ = this.query.selectAll();
  isLoading$ = this.query.selectLoading();
  pagination$ = this.query.pagination$;


  constructor( private query:  MetaQuery<any, any>) {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      untilDestroyed(this),
      tap(value => {
        this.query.updateMeta('text', value);
        this.loadEntities();
      })).subscribe();
  }

  ngOnInit() {
    this.query.resetMeta();
    this.loadEntities();
  }

  loadEntities(): void {}


  updatePage(pagination: PageEvent): void {
    this.query.updateMeta('pagination', {page: pagination.pageIndex, size: pagination.pageSize});
    this.loadEntities();
  }

  resetMeta():void{
    this.query.resetMeta();
  }

}
