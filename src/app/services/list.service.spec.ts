import { TestBed } from '@angular/core/testing';
import { concat, map, switchMap, take, tap } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { list, secondList } from '../mock-list';
import { Item } from '../model/Item';

import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
    
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method: getList', () => {
    it('should return list', (done: DoneFn) => {
      service.getList()
        .subscribe(res => {
          expect(res).toEqual(list);
          done();
        })
    })
  });

  describe('method: getNamesFromList', () => {
    it('should return array of texts from list', () => {
      const names = ['text6', 'text7', 'text8'];
      testScheduler.run(({cold, expectObservable}) => {
        const source$ = cold('a|', {a: secondList});
        const expected = 'b|';
  
        const destination$ = source$.pipe(
          map(res => res.map((item: Item) => item.name))
        );
  
        expectObservable(destination$).toBe(expected, {b: names});
      });
    })
  });

  describe('method: getAllLists', () => {
    it('should concatenate all lists in one', () => {
      const result = ['text6', 'text7', 'text8'];
      testScheduler.run(({cold, expectObservable}) => {
        const source1$ = cold('-a|', {a: ['text6']});
        const source2$ = cold('-b|', {b: ['text7', 'text8']});
        const expected = '-a-b|';
  
        const destination$ = concat(
          source1$,
          source2$
        )
  
        expectObservable(destination$).toBe(expected, {a: ['text6'], b: ['text7', 'text8']});
      });
    })
  });

  describe('method: getListFromYear', () => {
    it('should return list where current year is equal to year variable', () => {
      let currentYear: number;

      testScheduler.run(({cold, expectObservable}) => {
        const source1$ = cold('a|', {a: 2024});
        const source2$ = cold('--b|', {b: [...list, ...secondList]});
        const expected = '--c|';
  
        const destination$ = source1$.pipe(
          tap(res => currentYear = res),
          switchMap(() => source2$),
          map(res => res.filter(el => el.currentDate.getFullYear() === currentYear))
        )
  
        expectObservable(destination$).toBe(expected, {c: secondList});
      });
    })
  });

  describe('method: getFirstItemFromList', () => {
    it('should return first element from list', () => {

      testScheduler.run(({cold, expectObservable}) => {
        const source1$ = cold('-a-b-c-|', {a: 'text1', b: 'text2', c: 'text3'});
        const expected = '-(a|)';
  
        const destination$ = source1$.pipe(
          take(1)
        );

        expectObservable(destination$).toBe(expected, {a: 'text1', b: 'text2'});
      });
    })
  })
});
