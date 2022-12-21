import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {cloneDeep} from 'lodash';
import { Item } from '../model/Item';

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.scss']
})
export class NewItemDialogComponent {

  public newItem: Item;

  constructor(
    public dialogRef: MatDialogRef<NewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ) {
    this.newItem = cloneDeep(data);
  }

  public save(): void {
    this.dialogRef.close(this.newItem);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
