import NotFound from './components/NotFound';
import Home from './containers/Home';
import DistributionMapContainer from './containers/DistributionMapContainer';

export default [
  {
    exact: true,
    path: '/',
    component: DistributionMapContainer,
  },
  {
    exact: true,
    path: '/map',
    component: DistributionMapContainer,
  },
];
