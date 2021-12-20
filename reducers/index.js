import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import countReducer from './countReducer';
import feedReducer from './feedReducer';
import fitnessReducer from './finessReducer';
import challengeReducer from './challengeReducer';
import profileReducer from './profileReducer';
import friendReducer from './friendReducer';
const rootReducer = combineReducers(
{ 
 count: countReducer,
 auth:authReducer,
 fitness:fitnessReducer,
 feed:feedReducer,
 challenge:challengeReducer,
 profile:profileReducer,
 friend:friendReducer
}
);
export default rootReducer;