import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import countReducer from './countReducer';
import feedReducer from './feedReducer';
import fitnessReducer from './finessReducer';
import challengeReducer from './challengeReducer';
import profileReducer from './profileReducer';
const rootReducer = combineReducers(
{ 
 count: countReducer,
 auth:authReducer,
 fitness:fitnessReducer,
 feed:feedReducer,
 challenge:challengeReducer,
 profile:profileReducer
}
);
export default rootReducer;