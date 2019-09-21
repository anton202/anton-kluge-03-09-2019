import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = '7Is6CpWd2Q1WMUQXR8AY9VJKLJte6xGM';
  private apiUrlLocations: string = 'http://dataservice.accuweather.com/locations/v1';
  private apiUrlForecast: string = 'http://dataservice.accuweather.com/forecasts/v1';

  constructor(private http: HttpClient) { }

  locationNameSuggestion(locationName: string): Observable<any> {
    return this.http.get(`${this.apiUrlLocations}/cities/autocomplete?apikey=${this.apiKey}&q=${locationName}`)
  }

  getWeatherForecast(locationKey: string): Observable<any> {
    return this.http.get(`${this.apiUrlForecast}/daily/5day/${locationKey}?apikey=${this.apiKey}`)
  }

  getLocationKeyByGeoLocation(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`${this.apiUrlLocations}/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude}%2C${longitude}`)
  }

  getLocationKey(locationArray: Array<{ LocalizedName, Key }>, locationName: string): { LocalizedName, Key } {
    return locationArray.find(el => el.LocalizedName === locationName);
  }

}
