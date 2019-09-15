import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { favorite } from './store/favorites.action';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public favorites: Array<favorite>;

  constructor(private store: Store<{ favorites: { favorites } }>) {
    this.store.select('favorites')
      .subscribe(favorites => {
        this.favorites = favorites.favorites;
      })
  }

  public checkIfFavorite(locationName: string): boolean {
    for (let i = 0; i < this.favorites.length; i++) {
      if (locationName === this.favorites[i].name) {
        return true;
      }
    }
    return false;
  }

}
