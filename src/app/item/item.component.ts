import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../model/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() public item: Item;

  @Output() public deletedItem: EventEmitter<Item> = new EventEmitter();
  @Output() public openedItem: EventEmitter<Item> = new EventEmitter();

  constructor() { }

  public deleteItem() {
    this.deletedItem.emit(this.item);
  }

  public editItem() {
    this.openedItem.emit(this.item);
  }

}
