import { combineReducers } from 'redux';
import App from './App/Reducer';
import { IRootStore } from './Types';

const rootReducer = combineReducers<IRootStore>({
  App
});

export default rootReducer;
