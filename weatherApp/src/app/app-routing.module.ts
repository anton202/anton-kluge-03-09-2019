import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: "", component: WeatherComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'weather/:locationKey/:locationName', component: WeatherComponent },
  { path: 'favorites', component: FavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
