import { Action } from '@ngrx/store'

export const CHANGE_TEMPERATURE_UNIT = 'CHANGE_TEMPERATURE_UNIT';

export class ChangeTemperatureUnit implements Action{
    readonly type = CHANGE_TEMPERATURE_UNIT;
}