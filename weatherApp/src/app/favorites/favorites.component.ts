import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../store/state/app.state';
import { WeatherService } from '../weather/weather.service';
import { Weather } from '../models/weather.obj';
import { merge,concat, forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Array<Weather>;

  constructor(private store: Store<appState>, private weatherService: WeatherService) { }

  ngOnInit() {
    // const temperatureUnit = this.store.select('temperatureUnit');
    // const favorites = this.store.select('favorites');
    // const changeTemperature = forkJoin(favorites, temperatureUnit);
    // changeTemperature.subscribe((data:any) => console.log(data))
    console.log('test')
    this.store.select('temperatureUnit')
      .subscribe((mesureUnit) =>{
        this.store.select('favorites')
          .subscribe(favorites =>{
            this.favorites = this.weatherService.changeTemperature(favorites.favorites,mesureUnit.mesureUnit);
          })
      })
   }

}
