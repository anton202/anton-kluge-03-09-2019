import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { WeatherCardService } from './weather-card.service';
import { Weather } from '../models/weather.obj';
import { Store } from '@ngrx/store';
import { appState } from '../store/state/app.state';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() public dailyForecast: { Date, Temperature, Day };
  @Input() public favoriteData: Weather;
  public dayOfWeek: string;
  public temperature: number;
  public weatherIcon: string;
  public locationName: string
  public temperatureUnit: string;

  constructor(private weatherCardService: WeatherCardService, private router: Router, private store: Store<appState>) { }

  ngOnInit() {
    this.store.select('temperatureUnit')
      .subscribe(unit => {
        this.temperatureUnit = unit.mesureUnit
        this.dailyForecast ? this.setDailyForecast() : this.setFavoriteForecast();
      })
  }

  private setDailyForecast(): void {
    this.temperature = this.temperatureUnit === 'c' ?
      this.weatherCardService.convertToCelsius(this.dailyForecast.Temperature.Maximum.Value) :
      this.dailyForecast.Temperature.Maximum.Value;

    this.dayOfWeek = this.weatherCardService.getDayOfWeek(this.dailyForecast.Date)
    this.weatherIcon = this.weatherCardService.setWeatherIcon(this.dailyForecast.Day.Icon)
  }

  private setFavoriteForecast(): void {
    this.locationName = this.favoriteData.locationName;
    this.weatherIcon = this.favoriteData.weatherIcon;
    if (this.temperatureUnit !== this.favoriteData.mesureUnit) {
      switch (this.temperatureUnit) {
        case 'c':
          this.temperature = this.weatherCardService.convertToCelsius(this.favoriteData.temperature);
          return;

        case 'f':
          this.temperature = this.weatherCardService.convertToFahrenheit(this.favoriteData.temperature);
          return;
      }
    } else {
      this.temperature = this.favoriteData.temperature;
    }
  }

  public showFavoriteWeather(): void {
    if (this.favoriteData) {
      this.router.navigate(['/weather', { locationKey: this.favoriteData.locationKey, locationName: this.favoriteData.locationName }])
    }
  }

}
