
import {combineReducers} from 'redux';
import signinReducer from './SigninReducer.js';
import signupReducer from './SignupReducer.js';
import resendReducer from './ResendReducer.js';
import memberReducer from './MemberReducer.js';
import adminReducer from './AdminReducer.js';

const rootReducer = combineReducers({
  signinData : signinReducer,
  signupData : signupReducer,
  resendData : resendReducer,
  memberData : memberReducer,
  adminData : adminReducer,
})

export default rootReducer;
