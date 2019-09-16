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

  public checkIfFavorite(locationName: string): boolean {
    for (let i = 0; i < this.favorites.length; i++) {
      if (locationName === this.favorites[i].locationName) {
        return true;
      }
    }
    return false;
  }

}
