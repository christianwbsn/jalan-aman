import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  hehe() {
    console.log('keteken mas');
  }

  render() {
    const pos = { lat: -6.8773826, lng: 107.60341790000007 };
    const icon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';

    return (
      <div>
        <h1>JalanAman</h1>
        <Map google={this.props.google} zoom={14}>
          <Marker position={pos} onClick={this.hehe} icon={icon}/>
        </Map>
      </div>
    );
  }
}

export class DistributionMapContainer extends Component {
  render() {
    return (
      <div>
        <MapContainer />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg',
})(MapContainer);
