import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent implements OnInit, OnDestroy {
  artists: Artist[];
  subscription: Subscription;

  foundArtists: any[];
  artistFound: boolean = false;
  searching: boolean = false;
  // searchQuery: string;

  // queryValue = this.searchArtistForm.value;

  searchArtistForm: FormGroup;

  constructor(private artistService: ArtistService,
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.searchArtistForm = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });

    this.subscription = this.artistService.artistsChanged
      .subscribe(
        (artists: Artist[]) => {
          this.artists = artists;
        }
      );
    this.artists = this.artistService.getArtists();
  }

  handleSuccess(data) {
    this.artistFound = true;
    this.foundArtists = data.resultsPage.results.artist;
    console.log(data.resultsPage.results.artist);
  }

  handleError(error) {
    console.log(error);
  }

  onNewArtist() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  searchArtists(searchArtistForm) {
    console.log(searchArtistForm.value);
    this.searching = true;
    return this.searchService.getArtists(searchArtistForm).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}