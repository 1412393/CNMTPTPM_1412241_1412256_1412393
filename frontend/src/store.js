import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/index.js';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware,logger))

export default store;
