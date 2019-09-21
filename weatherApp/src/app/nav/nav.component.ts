import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeTemperatureUnit } from '../store/actions/temperature-unit.action';
import { appState } from '../store/state/app.state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   isCelcius: boolean = true;
  constructor( private store: Store<appState>) { }

  ngOnInit() {
  }

   changeTemperatureUnit(): void{
    this.isCelcius = this.isCelcius ? false : true;
    this.store.dispatch(new ChangeTemperatureUnit())
  }

}
