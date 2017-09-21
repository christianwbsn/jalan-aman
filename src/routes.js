import NotFound from './components/NotFound';
import Home from './containers/Home';
import CrimeDistributionMap from './containers/CrimeDistributionMap';

export default [
  {
    exact: true,
    path: '/',
    component: CrimeDistributionMap,
  },
  {
    exact: true,
    path: '/map',
    component: CrimeDistributionMap,
  },
];
