import { TestBed } from '@angular/core/testing';
import { ListAdapter } from '../adapters/list-adapter';
import { deprecatedList, modernList } from '../mock-list';

describe('ListAdapter', () => {
  let service: ListAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method: adapt', () => {
    it('should adapt deprecated item to modern one', () => {
        const result = service.adapt(deprecatedList[0]);
        expect(result).toEqual(modernList[0]);
    });
  });

  describe('method: adaptArray', () => {
    it('should adapt deprecated list to modern one', () => {
        const result = service.adaptArray(deprecatedList);
        expect(result).toEqual(modernList);
    });
  })
});