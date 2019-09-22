import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Weather } from '../models/weather.obj';
import { Store } from '@ngrx/store';
import { appState } from '../store/state/app.state';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() weather:Weather; 
  @Input() isFavotire: boolean;

  constructor( private route: ActivatedRoute, private store: Store<appState>) { }

  ngOnInit() {
    console.log(this.isFavotire)
   
  }

  

  // showFavoriteWeather(): void {
  //   if (this.favoriteLocationForecast) {
  //     this.router.navigate(['/weather', { locationKey: this.favoriteLocationForecast.locationKey, locationName: this.favoriteLocationForecast.locationName }])
  //   }
  // }

}
