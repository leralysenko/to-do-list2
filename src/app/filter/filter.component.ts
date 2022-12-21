import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Criteria } from '../model/Criteria';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filteredList: EventEmitter<Criteria> = new EventEmitter();

  public criteria: Criteria;

  public filter(): void {
    this.filteredList.emit(this.criteria);
  }

  public clear() {
    this.initCriteria();
    this.filteredList.emit(this.criteria);
  }

  public ngOnInit(): void {
    this.initCriteria();
  }

  public initCriteria() {
    this.criteria = new Criteria('', false, '');
  }

}
