import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Weather } from '../weather/weather.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public favorites: Array<Weather>;

  constructor(private store: Store<{ favorites: { favorites } }>) {
    this.store.select('favorites')
      .subscribe(favorites => {
        this.favorites = favorites.favorites;
      })
  }

  public checkIfFavorite(locationName: string) {
    const result = this.favorites.filter(el => locationName === el.locationName);
    return result.length > 0 ? true : false;
  }
}
