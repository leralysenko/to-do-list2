import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { list } from '../mock-list';
import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  public getList(): Observable<Item[]> {
    return of(list);
  }

  public saveList(list: Item[]): void {
    sessionStorage.setItem('list', JSON.stringify(list));
  }
}
