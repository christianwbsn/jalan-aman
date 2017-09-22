import NotFound from './components/NotFound';
import Home from './containers/Home';
import CrimeDistributionMap from './containers/CrimeDistributionMap';
import NewsList from './containers/NewsList';

export default [
  {
    name: 'Peta',
    exact: true,
    path: '/',
    component: CrimeDistributionMap,
  },
  {
    name: 'Login',
    exact: true,
    path: '/login',
    component: Home,
  },
  {
    name: 'Register',
    exact: true,
    path: '/register',
    component: Home,
  },
  {
    name: 'Berita',
    exact: true,
    path: '/berita',
    component: NewsList,
  },
  {
    name: 'Lapor',
    exact: true,
    path: '/lapor',
    component: Home,
  },
  {
    name: 'Dashboard',
    exact: true,
    path: '/dashboard',
    component: NotFound,
  },
];
