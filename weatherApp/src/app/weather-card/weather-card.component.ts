import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { WeatherCardService } from './weather-card.service';
import { Weather } from '../weather/weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() public dailyForecast:{Date,Temperature,Day};
  @Input() public favoriteData:Weather;
  private dayOfWeek: string;
  private temperature: number;
  private weatherIcon:string ;
  private locationName: string
  

  constructor(private weatherCardService: WeatherCardService, private router: Router) { }

  ngOnInit() {
    if(this.dailyForecast){
    this.temperature = this.weatherCardService.convertToCelsius(this.dailyForecast.Temperature.Maximum.Value)
    this.dayOfWeek = this.weatherCardService.getDayOfWeek(this.dailyForecast.Date)
    this.weatherIcon= this.weatherCardService.setWeatherIcon(this.dailyForecast.Day.Icon)
  }else{
    this.temperature = this.favoriteData.temperature;
    this.locationName = this.favoriteData.locationName
    this.weatherIcon = this.favoriteData.weatherIcon;
  }
}
 
private showFavoriteWeather(): void{
if (this.favoriteData){
  this.router.navigate(['/weather',{locationKey:this.favoriteData.locationKey, locationName:this.favoriteData.locationName}])
}
}
  
}
