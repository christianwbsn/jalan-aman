import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import routes from '../../routes';
import theme from '../../common/theme';
import '../../fonts.css';

import NavBar from '../../components/NavBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <NavBar />
      <Switch>
        {routes.map(route => <Route key={route.path} {...route} />)}
      </Switch>
      </div>
    </ThemeProvider>
  );

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Switch>
  //       {routes.map(route => <Route key={route.path} {...route} />)}
  //     </Switch>
  //   </ThemeProvider>
  // );
}

export default App;
