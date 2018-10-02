import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent implements OnInit, OnDestroy {

  constructor(private artistService: ArtistService,
    public authService: AuthService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute) { }

  artists: Artist[];
  subscription: Subscription;
  artist: Artist;

  foundArtists: any[];
  similarArtists: any[];

  foundArtistInfo: any;
  foundArtistId: any;
  foundArtistList: any[];
  index: number;

  foundArtistName: string;
  // foundArtistName: 'name';
  foundArtistArray: Artist;
  // foundArtistArray: any;
  name: string;

  artistFound: boolean = false;
  searching: boolean = false;
  searchQuery: string;

  artistId: any;

  // queryValue = this.searchArtistForm.value;

  searchArtistForm: FormGroup;

  userToken: any;


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


    this.searchArtistForm = new FormGroup({
      'searchQuery': new FormControl(null, Validators.required)
    });
  }

  handleSuccess(data) {
    this.artistFound = true;
    this.foundArtists = data.resultsPage.results.artist;
    this.foundArtistInfo = data.resultsPage.results.artist;
    this.foundArtistId = data.resultsPage.results.artist.id;
    this.foundArtistList = data.resultsPage.results;

    console.log(this.foundArtists);
    console.log(this.foundArtistId);
    // console.log(data.resultsPage.results.artist.displayName);
  }

  handleSimilarArtistsSuccess(data) {
    this.similarArtists = data.resultsPage.results.artist;
    console.log(this.similarArtists);
  }

  handleError(error) {
    console.log(error);
  }

  onNewArtist() {
    this.router.navigate(['new'], { relativeTo: this.route });
    console.log(this.authService.isAuthenticated());
  }

  // searchArtists(query: string) {
  //   // console.log(this.searchArtistForm.value);
  //   this.searching = true;
  //   console.log(query);
  //   return this.searchService.getArtists(query).subscribe(
  //     data => this.handleSuccess(data),
  //     // data => console.log(data),
  //     error => this.handleError(error),
  //     () => this.searching = false
  //   );
  // }

  searchArtists() {
    this.searching = true;
    const query = this.searchArtistForm.value.searchQuery;
    console.log(query);
    console.log(this.authService.isAuthenticated());
    return this.searchService.getArtists(query).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchSimilarArtist() {
    this.searching = true;
    const artistId = this.foundArtistId;
    return this.searchService.getSimilarArtists(artistId).subscribe(
      data => this.handleSimilarArtistsSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getUserToken() {
    this.userToken = this.authService.getToken();
    console.log(this.userToken);
    console.log(this.authService.isAuthenticated());
  }

  addArtistToList(foundArtistName: string, foundArtistId: number) {
    // console.log(this.foundArtistInfo);
    console.log(foundArtistName, foundArtistId);

    // this.foundArtistName = this.foundArtistArray;    

    // this.foundArtistArray = Artist;
    // this.foundArtistName = this.artist.name;

    // this.foundArtistArray = [foundArtistName, foundArtistId];
    // this.artist.id = foundArtistId;
    // console.log(this.artist.id);

    // this.foundArtistArray = [foundArtistName];

    // this.artist.name = foundArtistName;
    // this.artist.name = 'name';

    // this.artist = [foundArtistName, foundArtistId];
    // 'name': foundArtistName;
    // this.artist = foundArtistName;

    // this.artistService.addArtist(this.foundArtistArray);
    // this.artistService.addArtist(this.artist);

    // console.log(this.foundArtistList[index]);
    // this.handleSuccess(this.foundArtistInfo.results.artist.displayName);

    // return this.searchService.addArtistToList();
  }

  // onSubmit() {
  //   this.searchArtists(this.searchArtistForm.value);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}