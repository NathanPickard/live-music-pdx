import { Component, OnInit, ViewChild } from '@angular/core';
// import { trigger, state, transition, style, animate } from '@angular/animations';
import { fade } from '../../animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource, MatTable, PageEvent, MatPaginator } from '@angular/material';
import { merge, Observable, of as oberservableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { SearchService } from '../../shared/search.service';
// import { merge } from 'rxjs-compat/operator/merge';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:
    // [
    //   trigger('fade', [

    //     state('void', style({ opacity: 0 })),

    //     transition(':enter, :leave', [
    //       animate(1000)
    //     ])
    //   ])
    // ]
    [fade]
})

export class HomeComponent implements OnInit {

  foundEvents: any[];
  performanceArray: any[];
  foundArtists: any[];
  eventsFound: boolean = false;
  type: any[];

  foundSearchEvents: any[];
  searchEventsFound: boolean = false;

  searchQuery: string;

  displayedColumns: string[] = ['date', 'displayName', 'venue', 'uri', 'datetime'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;
  dataSource: any;
  searchDataSource: any;

  searchEventForm: FormGroup;
  searchEventNotFound: boolean = false;
  // dataSource: MatTableDataSource<any>;

  constructor(private searchService: SearchService) { }

  ngOnInit() {

    this.getPdxEvents();

    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null)
    });

    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null)
    })

    // this.getPdxEvents()
    //   data => {
    //     this.dataSource.data = data;
    //   }

    // this.dataSource.sort = this.sort;

    // merge(this.sort.sortChange)
    // .pipe(
    //   startWith({}),
    //   switchMap(() => {
    //     return this.handleSuccess(this.sort.active);
    //   })
    // )
  }

  handleSuccess(data) {
    this.eventsFound = true;
    this.foundEvents = data.resultsPage.results.event;
    this.dataSource = this.foundEvents;
    // this.performanceArray = data.resultsPage.results.event.location;
    // this.foundArtists = data.resultsPage.results.event.performance.artist;
    // console.log(this.foundArtists);
    console.log(this.foundEvents);
    // console.log(this.performanceArray);
  }

  handleSearchEventsSuccess(data) {
    this.searchEventsFound = true;
    this.foundSearchEvents = data.resultsPage.results.event;
    this.searchDataSource = this.foundSearchEvents;
    console.log(this.foundSearchEvents);

    if (this.foundSearchEvents == undefined) {
      this.searchEventNotFound = true;
    }
  }

  handleError(error) {
    console.log(error);
  }

  getPdxEvents() {
    return this.searchService.getPdxEvents().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

  searchEvents() {
    const query = this.searchEventForm.value.searchQuery;
    return this.searchService.getSearchEvents(query).subscribe(
      data => this.handleSearchEventsSuccess(data),
      error => this.handleError(error)
    );
  }

}
