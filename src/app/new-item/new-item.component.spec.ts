import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NewItemComponent } from './new-item.component';

describe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: openFilter', () => {
    it('should be called when user clicks a sort icon button', fakeAsync(() => {
      spyOn(component, 'openFilterMenu');
      let button = fixture.debugElement.query(By.css('.open'));
      button.triggerEventHandler('click', null);
      tick();
      expect(component.openFilterMenu).toHaveBeenCalled();
    }));

    it('should send data through openedFilterMenu output', () => {
      spyOn(component.openedFilterMenu , 'emit');
      component.openFilterMenu();
      expect(component.openedFilterMenu.emit).toHaveBeenCalled();
    });
  });

  describe('method: openDialog', () => {
    it('should be called when user clicks add_circle icon button', fakeAsync(() => {
      spyOn(component, 'openDialog');
      let button = fixture.debugElement.query(By.css('.edit'));
      button.triggerEventHandler('click', null);
      tick();
      expect(component.openDialog).toHaveBeenCalled();
    }));

    it('should send data through openedItem output', () => {
      spyOn(component.openedItem, 'emit');
      component.openDialog();
      expect(component.openedItem.emit).toHaveBeenCalled();
    });
  });

  describe('method: ngOnInit', () => {
    it('should call initItem', () => {
      spyOn(component, 'initNewItem');
      component.ngOnInit();
      expect(component.initNewItem).toHaveBeenCalled();
    });
  });
});
