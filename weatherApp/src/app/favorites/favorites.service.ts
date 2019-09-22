import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Weather } from '../models/weather.obj';
import { appState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor() {}

  // checkIfFavorite(locationName: string) {
  //   const result = this.favorites.filter(el => locationName === el.locationName);
  //   return result.length > 0 ? true : false;
  // }
}
