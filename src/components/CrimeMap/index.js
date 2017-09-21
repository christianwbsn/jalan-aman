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

const MapWithAMarker = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  {
    console.log(props);
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        {
          props.reports.map((report, key) => (
            <Marker
              key={key}
              position={report.position}
              icon={report.icon}
              onClick={() => props.onMarkerClick(report.message)}
            />
          ))
        }
      </GoogleMap>
    );
  }
);

class Coba extends Component {
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
      position: { lat: -34.397, lng: 151.644 },
      icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      message: 'hanyalah cinta'
    }
    ];

    return (
      <MuiThemeProvider>
        <div>
          <div>
            <MapWithAMarker reports={reports} onMarkerClick={this.onMarkerClick}/>
          </div>
          <Drawer
            openSecondary={true}
            docked={false}
            width={200}
            open={this.state.isPaneOpen}
            onRequestChange={(isPaneOpen) => this.setState({isPaneOpen})}
          >
            <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Coba;