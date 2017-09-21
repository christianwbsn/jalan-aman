/* eslint-disable */
import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    }
  }

  onLeftIconClick() {
    this.setState({isDrawerOpen: true});
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
            onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})}>
            <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}
