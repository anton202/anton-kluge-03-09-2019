import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module'
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { favoritesReducer } from './store/reducers/favorites.reducer';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { temperatureUnitReducer } from './store/reducers/temperature-unit.reducer';
import { appReducers } from './store/reducers/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WeatherComponent,
    WeatherCardComponent,
    FavoritesComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot(appReducers)
  ],
  entryComponents: [
    ErrorMessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
