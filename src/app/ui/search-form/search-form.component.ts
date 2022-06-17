import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IFilterOptions } from '../models/filterOption.inteface';

import { debounceTime } from 'rxjs/operators';
import { FhirSearchFn } from '@red-probeaufgabe/types';
import { SearchFacadeService } from '@red-probeaufgabe/search';
@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  /** Implement Search Form */

  filterField = new FormControl(FhirSearchFn.SearchAll, Validators.required);
  filterOptions: IFilterOptions[] = [
    { key: FhirSearchFn.SearchAll, value: 'Patients + Practitioners (Patient/Ärzte)' },
    { key: FhirSearchFn.SearchPatients, value: 'Patients (Patient)' },
    { key: FhirSearchFn.SearchPractitioners, value: 'Practitioners (Ärzte)' },
  ];

  searchForm = new FormGroup({
    searchField: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]),
    filterField: this.filterField,
  });

  constructor(private readonly searchFacade: SearchFacadeService) {}

  ngOnInit(): void {
    this.searchForm
      .get('searchField')
      .statusChanges.pipe(debounceTime(300))
      .subscribe((status) => {
        if (status === 'VALID') {
          this.search(this.searchForm.get('searchField').value, this.searchForm.get('filterField').value);
        }
      });

    this.searchForm.get('filterField').valueChanges.subscribe((filterValue) => {
      if (this.searchForm.get('searchField').status === 'VALID') {
        this.search(this.searchForm.get('searchField').value, filterValue);
      }
    });
  }

  search(query, type) {
    console.log(query, type);
    this.searchFacade.search(type, query);
  }
}
