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
    }
  }

  onMarkerClick(message) {
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
    console.log(props);
    return (<MapDialog {...props} />);
    // return (
    //   <div>
    //     <GoogleMap
    //       defaultZoom={16}
    //       defaultCenter={props.center}>
    //       {
    //         props.reports.map((report, key) => (
    //           <Marker
    //             key={key}
    //             position={report.position}
    //             icon={report.icon}
    //             onClick={() => props.onMarkerClick(report.message)}
    //           />
    //         ))
    //       }
    //     </GoogleMap>

    //   </div>
    // );
  }
);

class CrimeMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPaneOpen: false,
    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  onMarkerClick(content) {
    alert(content);
  }

  render() {
    const reports = [
    {
      position: { lat: -34.397, lng: 150.644 },
      icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      message: 'cinta',
    },
    {
      position: { lat: -6.877542, lng: 107.6036 },
      icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      message: 'hanyalah cinta'
    }
    ];

    return (
      <MuiThemeProvider>
        <div>
          <div>
            <MapWithAMarker
              reports={reports}
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