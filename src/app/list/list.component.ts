import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';
import { Criteria } from '../model/Criteria';
import { Item } from '../model/Item';
import { Mode } from '../model/Mode';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: Item[] = [];
  public filteredList: Item[] = [];
  public mode: string = Mode.all;
  public isShowedFilterMenu = false;
  public criteria: Criteria;

  public newItem: Item;
  public modes = Mode;

  constructor(
    private readonly dialog: MatDialog,
    private readonly listService: ListService
  ) { }

  public addNewItem(newItem: Item): void {
    this.list.push(newItem);
    this.filterList();
  }

  public deleteItem(item: Item): void {
    this.list = this.list.filter(el => el.id !== item.id);
    this.filterList();
  }

  public changeMode(m: string): void {
    this.mode = m;
  }

  public deleteCompletedItems(): void {
    this.list = this.list.filter(el => !el.isDone);
    this.filterList();
  }

  public filterList(criteria?: Criteria) {
    this.criteria = criteria ? criteria : (this.criteria ? this.criteria : new Criteria('', false, ''));
    this.filteredList = this.list.filter(el => el.name.startsWith(this.criteria.filter));
    this.sortList(this.criteria);
  }

  public openFilterMenu(): void {
    this.isShowedFilterMenu = !this.isShowedFilterMenu;
  }

  public openNewItem(newItem: Item): void {
    this.openDialog(newItem).subscribe(res => {
      this.newItem = res;
    });
  }

  public openExistItem(item: Item): void {
    this.openDialog(item).subscribe(res => {
      const index = this.list.findIndex(el => el.id === res.id);
      this.list[index] = res;
    });
  }

  public openDialog(item: Item): Observable<Item> {
    const dialogConfig = this.getConfigDialog(item);
    const dialogRef = this.dialog.open(NewItemDialogComponent, dialogConfig);
    return dialogRef.afterClosed().pipe(filter(res => res));
  }

  public ngOnInit() {
    this.listService.getListFromYear(2024).subscribe(res => {console.log('list', res);});
  }

  private getConfigDialog(item: Item): MatDialogConfig {
    const config = new MatDialogConfig();
    config.width = '900px';
    config.height = '600px';
    config.data = item;
    return config;
  }

  private sortList(criteria: Criteria) {
    if (criteria.property) {
      this.filteredList.sort(function(a, b) {
        if (!criteria.descending) {
          return (a as any)[criteria.property].localeCompare((b as any)[criteria.property]);
        } else {
          return (b as any)[criteria.property].localeCompare((a as any)[criteria.property]);
        }
      });
    }
  }

}
