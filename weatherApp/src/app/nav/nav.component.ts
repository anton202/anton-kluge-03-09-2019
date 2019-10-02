import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeTemperatureUnit } from '../store/actions/temperature-unit.action';
import { appState } from '../store/state/app.state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
   tempUnit:string;
  constructor( private store: Store<appState>) { }

  ngOnInit() {
    this.store.select('temperatureUnit')
      .subscribe(unit =>{
        this.tempUnit = unit.mesureUnit;
      })
  }

   changeTemperatureUnit(): void{
    this.store.dispatch(new ChangeTemperatureUnit())
  }

}
