import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import report from './report';

export default combineReducers({
  counter,
  reportState: report,
  router: routerReducer,
});
