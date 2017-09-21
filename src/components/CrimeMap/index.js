/* eslint-disable */
import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoBox
} from "react-google-maps";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import Sidebar from 'react-sidebar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import CrimeDetailDialog from '../CrimeDetailDialog';

class MapDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogOpen: false,
      dialogContent: {}
    }
  }

  onMarkerClick(dialogContent) {
    this.handleOpen();
  }

  handleOpen = () => {
    this.setState({isDialogOpen: true});
  };

  handleClose = () => {
    this.setState({isDialogOpen: false});
  };

  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={16}
          defaultCenter={this.props.center}>
          {
            this.props.reports.map((report, key) => (
              <Marker
                key={key}
                position={report.position}
                icon={report.icon}
                onClick={() => ::this.onMarkerClick(report.message)}
              />
            ))
          }
        </GoogleMap>
        <Dialog
          title="Detail Kejahatan"
          modal={false}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {'begal @ cisitu'}
        </Dialog>
      </div>
    );
  }
}

const MapWithAMarker = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg&v=3.exp&libraries=geometry,drawing,places",
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  {
    return (<MapDialog {...props} />);
  }
);

class CrimeMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <MapWithAMarker
              reports={this.props.reports}
              onMarkerClick={this.onMarkerClick}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `800px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={{ lat: -6.877542, lng: 107.6036 }}
              />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CrimeMap;