import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { appReducers } from './store/reducers/app.reducers';
import { ThemeDirective } from './theme/theme.directive';
import { effects } from './store/effects/'
import { FavoritesEffects} from './store/effects/favorites.effect';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WeatherComponent,
    WeatherCardComponent,
    FavoritesComponent,
    ErrorMessageComponent,
    ThemeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([FavoritesEffects]),
    ],
  entryComponents: [
    ErrorMessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
