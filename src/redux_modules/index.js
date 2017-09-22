import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import report from './report';
import navz from './navz';

export default combineReducers({
  counter,
  reportState: report,
  navState: navz,
  router: routerReducer,
});
