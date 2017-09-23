import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import report from './report';
import navz from './navz';
import auth from './auth';

export default combineReducers({
  counter,
  auth,
  reportState: report,
  navState: navz,
  router: routerReducer,
});
