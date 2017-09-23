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
export default class RegisterView extends Component {
  constructor(props) {
    super(props);
    const user = {
      email: 'test2@gmail.com',
      password: 'test',
    };
    this.submitRegister = this.submitRegister.bind(this);
  }

  submitRegister() {
    const name = this.refs.nama.input.value;
    const phone = this.refs.telpon.input.value;
    const email = this.refs.email.input.value;
    const password = this.refs.password.input.value;
    const passwordAgain = this.refs.passwordAgain.input.value;
    const username = this.refs.username.input.value;
    if (password == passwordAgain) {
      this.props.registerUser({ name, phone, email, password, username });
    } else {
      alert("Password tidak sama");
    }
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
          <h4>Laman Register</h4>
          <TextField ref={'nama'} floatingLabelText="Nama Lengkap"/><br />
          <TextField ref={'telpon'} floatingLabelText="Nomor Telepon" /><br />
          <TextField ref={'username'} floatingLabelText="Username" /><br />
          <TextField ref={'email'} floatingLabelText="Email" /><br />
          <TextField ref={'password'} type={'password'} floatingLabelText="Password" /><br />
          <TextField ref={'passwordAgain'} type={'password'} floatingLabelText="Masukkan Password Lagi" /><br />
          <RaisedButton label="Login" onClick={this.submitRegister} primary={true}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
