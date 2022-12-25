import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { ListAdapter } from '../adapters/list-adapter';
import { deprecatedList, list, secondList } from '../mock-list';
import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private readonly listAdapter: ListAdapter
  ) { }

  public getList(): Observable<Item[]> {
    return of(list);
  }

  public getNamesFromList(): Observable<string[]> {
    return of(list).pipe(map(res => res.map(el => el.name)));
  }

  public getAllLists(): Observable<Item[]> {
    return forkJoin(
      {
        list1: of(list),
        list2: of(secondList)
      }).pipe(map(res => [...res.list1, ...res.list2]))
  }

  public getListFromYear(year: number): Observable<Item[]> {
    let currentYear: number;
    return of(year)
      .pipe(
        tap(res => currentYear = res),
        switchMap(() => this.getAllLists()),
        map(res => res.filter(el => el.currentDate.getFullYear() === currentYear))
      )
  }

  public getFirstItemFromList(): Observable<Item> {
    return from(list).pipe(take(1));
  }

  public getDeprecatedList(): Observable<Item[]> {
    return of(deprecatedList)
      .pipe(
        map(this.listAdapter.adaptArray)
      )
  }
}
