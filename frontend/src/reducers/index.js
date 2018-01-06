
import {combineReducers} from 'redux';
import signinReducer from './SigninReducer.js';
import signupReducer from './SignupReducer.js';
import resendReducer from './ResendReducer.js';
const rootReducer = combineReducers({
  signinData : signinReducer,
  signupData : signupReducer,
  resendData : resendReducer,
})

export default rootReducer;
