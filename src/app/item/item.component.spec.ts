import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Item } from '../model/Item';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = new Item('', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteItem method when click close icon button', fakeAsync(() => {
    spyOn(component, 'deleteItem');
    let button = fixture.debugElement.query(By.css('.delete'));
    button.triggerEventHandler('click', null);
    tick();
    expect(component.deleteItem).toHaveBeenCalled();
  }));

  it('should send data through deletedItem output when call deleteItem method', () => {
    spyOn(component.deletedItem, 'emit');
    component.deleteItem();
    expect(component.deletedItem.emit).toHaveBeenCalled();
  });

  it('should call editItem method when click edit icon button', fakeAsync(() => {
    spyOn(component, 'editItem');
    let button = fixture.debugElement.query(By.css('.edit'));
    button.triggerEventHandler('click', null);
    tick();
    expect(component.editItem).toHaveBeenCalled();
  }));

  it('should send data through openedItem output when call editItem method', () => {
    spyOn(component.openedItem, 'emit');
    component.editItem();
    expect(component.openedItem.emit).toHaveBeenCalled();
  });
});
