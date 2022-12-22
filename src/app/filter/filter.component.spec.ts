import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Criteria } from '../model/Criteria';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: filter', () => {
    it('should be called when user clicks an Apply button', fakeAsync(() => {
      spyOn(component, 'filter');
      let button = fixture.debugElement.query(By.css('.apply'));
      button.triggerEventHandler('click', null);
      tick();
      expect(component.filter).toHaveBeenCalled();
    }));

    it('should send data through filteredList output', () => {
      spyOn(component.filteredList, 'emit');
      component.filter();
      expect(component.filteredList.emit).toHaveBeenCalled();
    });
  });

  describe('method: clear', () => {
    it('should be called when user clicks a Clear button', fakeAsync(() => {
      spyOn(component, 'clear');
      let button = fixture.debugElement.query(By.css('.clear'));
      button.triggerEventHandler('click', null);
      tick();
      expect(component.clear).toHaveBeenCalled();
    }));

    it('should send data through filteredList output', () => {
      spyOn(component.filteredList, 'emit');
      component.clear();
      expect(component.filteredList.emit).toHaveBeenCalled();
    });
  })

  describe('method: ngOnInit', () => {
    it('should init criteria', () => {
      spyOn(component, 'initCriteria');
      component.ngOnInit();
      expect(component.initCriteria).toHaveBeenCalled();
      expect(component.criteria.property).toEqual('');
      expect(component.criteria.descending).toEqual(false);
      expect(component.criteria.filter).toEqual('');
    });
  });
  
});
