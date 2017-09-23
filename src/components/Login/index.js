/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import * as authActions from '../../redux_modules/auth';

@connect(
  state => ({
    auth: state.auth,
  }),
  authActions
)
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    const user = {
      email: 'test2@gmail.com',
      password: 'test',
    };
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin() {
    const email = this.refs.email.input.value;
    const password = this.refs.password.input.value;
    this.props.loginUser({ email, password });
  }

  render() {
    console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <h4>sudah logged in</h4>
        </div>
      );
    }

    return (
      <MuiThemeProvider>
        <div>
          <h4>Laman Login</h4>
          <TextField ref={'email'} floatingLabelText="Email"/><br />
          <TextField ref={'password'} floatingLabelText="Password" /><br />
          <RaisedButton label="Login" onClick={this.submitLogin} primary={true}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
