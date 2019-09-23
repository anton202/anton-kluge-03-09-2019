import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Weather } from '../models/weather.obj';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent implements OnInit {
  @Input() weather: Weather;
  @Input() isFavotire: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  showFavoriteWeather(): void {
    if (this.isFavotire) {
      this.router.navigate(['/weather', { locationKey: this.weather.locationKey, locationName: this.weather.locationName }])
    }
  }

  test(){
    console.log('weather-card')
  }
}
