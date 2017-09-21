import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }

  onLeftIconClick() {
    this.setState({ isDrawerOpen: true });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            onLeftIconButtonTouchTap={::this.onLeftIconClick}
            title="JalanAman"/>
          <Drawer
            docked={false}
            width={200}
            open={this.state.isDrawerOpen}
            onRequestChange={isDrawerOpen => this.setState({ isDrawerOpen })}
          >
            <Link to={'/'}>
              <MenuItem>Home</MenuItem>
            </Link>
            <Link to={'/map'}>
              <MenuItem>Map</MenuItem>
            </Link>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}
