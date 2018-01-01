
import {combineReducers} from 'redux';
import signinReducer from './SigninReducer.js';
import signupReducer from './SignupReducer.js';

const rootReducer = combineReducers({
  signinData : signinReducer,
  signupData : signupReducer
})

export default rootReducer;
