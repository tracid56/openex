import {combineReducers} from 'redux';
import application from './Application';
import identity from './Identity';
import referential from './Referential';
import screen from './Screen';
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  application,
  identity,
  referential,
  screen,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;