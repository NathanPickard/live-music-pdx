import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  foundPopularEvents: any[];
  eventsFound: boolean = false;
  today: number = Date.now();

  searchEventForm: FormGroup;

  displayedColumns: string[] = ['date', 'displayName', 'venue', 'uri', 'datetime'];

  dataSource: any;

  ngOnInit() {
    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null, Validators.required)
    });

    this.getPopularPdxEvents();

  }

  searchEvents() {
  }

  getPopularPdxEvents() {
    return this.searchService.getPopularPdxEvents().subscribe(
      data => this.handlePopularEventsSuccess(data),
      error => this.handleError(error)
    );
  }

  handlePopularEventsSuccess(data) {
    this.eventsFound = true;
    this.foundPopularEvents = data.resultsPage.results.event;

    let mostPopular = this.foundPopularEvents;


    // mostPopular.sort((a, b) => 0 - (a > b ? 1 : -1));

    // Sorting events by popularity
    mostPopular.sort((a, b) => 0 - (a.popularity > b.popularity ? 1 : -1));

    mostPopular.length = 5;
    // mostPopular.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
    this.dataSource = mostPopular;

    console.log(mostPopular);
  }

  handleError(error) {
    console.log(error);
  }

}
