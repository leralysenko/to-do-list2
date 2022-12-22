import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Criteria } from '../model/Criteria';
import { Item } from '../model/Item';
import { Mode } from '../model/Mode';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let newItem: Item;
  let completedItem: Item;
  let criteria: Criteria;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        {provide: MatDialog, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    newItem = new Item('plan1', false);
    completedItem = new Item('plan2', true);
    criteria = new Criteria('name', true, '');
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: addNewItem', () => {
    it('should add item in list', () => {
      component.addNewItem(newItem);
      expect(component.list).toContain(newItem);
    });
  });

  describe('method: deleteItem', () => {
    it('should delete item from list', () => {
      component.addNewItem(newItem);
      component.deleteItem(newItem);
      const isContain = component.list.some(el => el.id === newItem.id);
      expect(isContain).toBe(false);
    });
  });

  describe('method: changeMode', () => {
    it('should set new mode value', () => {
      const mode = Mode.active;
      component.changeMode(mode);
      expect(component.mode).toEqual(mode);
    });
  });

  describe('method: deleteCompletedItems', () => {
    it('should delete completed Items in list', () => {
      component.addNewItem(newItem);
      component.addNewItem(completedItem);
      expect(component.list.length).toBe(2);
      component.deleteCompletedItems();
      expect(component.list.length).toBe(1);
    })
  });

  describe('method: filterList', () => {
    it('should filter a list and set new value for filteredList variable', () => {
      component.addNewItem(newItem);
      component.addNewItem(completedItem);
      component.filterList(criteria);
      expect(component.filteredList[1]).toEqual(newItem);
    });
  });

  describe('method: openFilterMenu', () => {
    it('should show/hide block with .filter-menu class', () => {
      expect(fixture.debugElement.query(By.css('.filter-menu'))).toBeFalsy();
      component.openFilterMenu();
      fixture.detectChanges();
      expect(component.isShowedFilterMenu).toBeTrue();
      expect(fixture.debugElement.query(By.css('.filter-menu'))).toBeTruthy();
    });
  });
});
