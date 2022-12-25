import { Injectable } from "@angular/core";
import { DeprecatedItem } from "../model/DeprecatedItem";
import { Item } from "../model/Item";

@Injectable({
   providedIn: 'root'
 })

export class ListAdapter {
    adapt = (item: DeprecatedItem): Item => 
     {
        const newItem = new Item(item.itemName, item.isDone, item.currentDate, item.expiredDate);
        newItem.id = item.id;
        return newItem;
     };

  adaptArray = (list: DeprecatedItem[]): Item[] => 
    list.map(item => this.adapt(item));
}