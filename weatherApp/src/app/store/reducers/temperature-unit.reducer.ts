import * as temperatureUnitAction from '../actions/temperature-unit.action';
import { initialTemepratureUnitState } from '../state/temeprature-unit.state';

export function temperatureUnitReducer(state = initialTemepratureUnitState, action){
    switch(action.type){
        case temperatureUnitAction.CHANGE_TEMPERATURE_UNIT:
            return{
                ...state,
                mesureUnit: state.mesureUnit === 'c'? 'f' : 'c'
            }
            
            default:
                return state
            }

            
}