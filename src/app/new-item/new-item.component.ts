import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../model/Item';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  @Input() public newItem: Item;

  @Output() public addedNewItem: EventEmitter<Item> = new EventEmitter();
  @Output() public openedItem: EventEmitter<Item> = new EventEmitter();
  @Output() public openedFilterMenu: EventEmitter<void> = new EventEmitter();

  constructor(
  ) { }

  public keyDownFunction(event: any): void {
    if (event.keyCode === 13) {
      this.addedNewItem.emit(this.newItem);
      this.initNewItem();
    }
  }

  public openDialog(): void {
    this.openedItem.emit(this.newItem);
  }

  public openFilterMenu(): void {
    this.openedFilterMenu.emit();
  }

  public ngOnInit() {
    this.initNewItem();
  }

  private initNewItem(): void {
    this.newItem = new Item('', false);
  }

}
