import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeTemperatureUnit } from '../store/actions/temperature-unit.action';
import { appState } from '../store/state/app.state';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private isCelcius = true;
  constructor( private store: Store<appState>, private themeService: ThemeService) { }

  ngOnInit() {
  }

  private changeTemperatureUnit(){
    this.isCelcius = this.isCelcius ? false : true;
    this.store.dispatch(new ChangeTemperatureUnit())
  }

 private changeTheme(): void{
   console.log('test')
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
}
