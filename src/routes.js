import NotFound from './components/NotFound';
import Home from './containers/Home';
import CrimeDistributionMap from './containers/CrimeDistributionMap';
import NewsList from './containers/NewsList';
import ReportContainerMap from './containers/ReportContainerMap';
import LoginView from './components/Login';
import RegisterView from './components/Register';

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
    component: LoginView,
  },
  {
    name: 'Register',
    exact: true,
    path: '/register',
    component: RegisterView,
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
    component: ReportContainerMap,
  },
  {
    name: 'Dashboard',
    exact: true,
    path: '/dashboard',
    component: NotFound,
  },
];
