/* eslint-disable */
import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

export default class CrimeDetailDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true
    }
  }

  handleClose() {
    this.setState({isOpened: false});
  }

  render() {
    const content = this.props.message;
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            title="Scrollable Dialog"
            modal={false}
            open={this.state.isOpened}
            onRequestClose={::this.handleClose}
            autoScrollBodyContent={true}
          >
            <h1>{content}</h1>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}