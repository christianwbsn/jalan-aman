import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import * as navActions from '../../redux_modules/navz';
import * as authActions from '../../redux_modules/auth';


import routes from '../../routes';

@connect(
  state => ({
    navState: state.navState,
    isAuthenticated: state.auth.isAuthenticated,
  }),
  authActions
)
export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };

    this.onLeftIconClick = this.onLeftIconClick.bind(this);
  }

  componentDidMount() {
    // const { clientHeight } = this.refs.navz;
    // if (clientHeight) {
    //   this.props.updateNavHeight(clientHeight); // Apus kalo gakepake
    // }
  }

  onLeftIconClick() {
    this.setState({ isDrawerOpen: true });
  }

  renderRegisterLoginBar() {
    return (
      <div>
        <Link to={'/login'} key={'login-h3u2h412'}>
          <MenuItem>{'Login'}</MenuItem>
        </Link>
        <Link to={'/register'} key={'register-asdjad'}>
          <MenuItem>{'Register'}</MenuItem>
        </Link>
      </div>
    );
  }

  renderUserInfoBar() {
    return (
      <div>
        <Paper style={userProfPictStyle} zDepth={1} circle={true} />
        <h4>nama lengkap</h4>
        <h4>jenis akun</h4>
      </div>
    );
  }

  logout() {
    this.props.logoutUser();
  }

  renderRouteBar() {
    const filteredRoutes = routes.filter(r => r.name != 'Login' && r.name != 'Register');
    return (
      <div>
        {filteredRoutes.map((route, key) => {
          return (
            <Link to={route.path} key={key}>
              <MenuItem>{route.name}</MenuItem>
            </Link>
          );
        })}
      </div>
    );
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <MuiThemeProvider>
        <div ref={'navz'}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconClick}
            title="JalanAman"
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.isDrawerOpen}
            onRequestChange={isDrawerOpen => this.setState({ isDrawerOpen })}
          >
            <UserStatusDiv>
              {!isAuthenticated && this.renderRegisterLoginBar()}
              {isAuthenticated && this.renderUserInfoBar()}
            </UserStatusDiv>
            {this.renderRouteBar()}
            {isAuthenticated && <MenuItem onClick={::this.logout}>Logout</MenuItem>}
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

const UserStatusDiv = styled.div`
  margin: 0 auto;
  background-color: yellow;
`;

const userProfPictStyle = {
  height: 60,
  width: 60,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};
