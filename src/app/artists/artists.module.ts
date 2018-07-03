import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ArtistsComponent } from './artists.component';
import { ArtistStartComponent } from './artist-start/artist-start.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistItemComponent } from './artist-list/artist-item/artist-item.component';
import { ArtistsRoutingModule } from './artist-routing.module';

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistStartComponent,
    ArtistListComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    ArtistItemComponent,
    ArtistsRoutingModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArtistsRoutingModule
  ]
})

export class ArtistsModule { }


