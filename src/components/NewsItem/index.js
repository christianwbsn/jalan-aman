import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class NewsItem extends Component {
  static propTypes = {
    judul: PropTypes.string.isRequired,
    lokasi: PropTypes.string.isRequired,
    waktu: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    komentar: PropTypes.string.isRequired,
  };

  render() {
    const { judul, lokasi, waktu, status, komentar } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Card>
            <CardHeader
              title={judul}
              subtitle={status}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                <h4>{waktu}</h4>
                <h4>{komentar}</h4>
              </div>
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}