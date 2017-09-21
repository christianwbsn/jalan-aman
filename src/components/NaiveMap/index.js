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

const MapWithAMarker = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      icon={'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'}
    />
  </GoogleMap>
);

class Coba extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MapWithAMarker />
    );
  }
}

export default Coba;