import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer} from './themeReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({reducer}), applyMiddleware(thunk));

export default store;
