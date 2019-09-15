import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { WeatherCardService } from './weather-card.service';
import { favorite } from '../favorites/store/favorites.action';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() public dailyForecast:{Date,Temperature,Day};
  @Input() public favoriteData:favorite;
  public dayOfWeek: string;
  public temperature: number;
  public weatherIcon:string ;
  public locationName: string
  

  constructor(private weatherCardService: WeatherCardService, private router: Router) { }

  ngOnInit() {
    if(this.dailyForecast){
    this.temperature = this.weatherCardService.convertToCelsius(this.dailyForecast.Temperature.Maximum.Value)
    this.dayOfWeek = this.weatherCardService.getDayOfWeek(this.dailyForecast.Date)
    this.weatherIcon= this.weatherCardService.setWeatherIcon(this.dailyForecast.Day.Icon)
  }else{
    this.temperature = this.favoriteData.weather;
    this.locationName = this.favoriteData.name
    this.weatherIcon = this.favoriteData.icon;
  }
}
 
public showFavoriteWeather(): void{
if (this.favoriteData){
  this.router.navigate(['/weather',{locationKey:this.favoriteData.id, locationName:this.favoriteData.name}])
}
}
  
}
