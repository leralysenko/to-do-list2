import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../model/Item';

import { NewItemDialogComponent } from './new-item-dialog.component';

describe('NewItemDialogComponent', () => {
  let component: NewItemDialogComponent;
  let fixture: ComponentFixture<NewItemDialogComponent>;

  beforeEach(async () => {
    let data = new Item('plan3', false);
    let matDialogMock = {
      close: (value: Item) => {}
    }
    await TestBed.configureTestingModule({
      declarations: [ NewItemDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: matDialogMock},
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close method when save data', () => {
    spyOn(component.dialogRef, 'close');
    component.save();
    expect(component.dialogRef.close).toHaveBeenCalled();
  })
});
