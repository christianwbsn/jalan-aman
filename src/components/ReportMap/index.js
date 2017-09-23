import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import 'react-sliding-pane/dist/react-sliding-pane.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

import get from 'lodash/fp/get';

import ReportForm from '../../components/ReportForm';

class MapWithReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogOpen: false,
      dialogContent: {},
      center: this.props.center,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.center !== nextProps.center) {
      this.setState({ center: nextProps.center });
    }
  }

  // Untuk update center
  onBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter(),
    });
  }

  // Untuk search box update - blom bisa
  onPlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });
    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));
    const nextCenter = get(nextMarkers, '0.position', this.state.center);

    this.setState({
      center: nextCenter,
      markers: nextMarkers,
    });
  }

  onMarkerClick() {
    this.handleOpen();
  }

  handleOpen() {
    this.setState({ isDialogOpen: true });
  }

  handleClose() {
    this.setState({ isDialogOpen: false });
  }

  getMapOptions() {
    return {
      gestureHandling: 'greedy',
      mapTypeControl: false,
    };
  }

  renderCurrentLocationMarker() {
    return (
      <Marker
        position={this.state.center}
        onClick={() => ::this.onMarkerClick('hehehehe')}
      />
    );
  }

  renderReportDialog() {
    return (
      <Dialog
        title="Form Pelaporan"
        modal={false}
        open={this.state.isDialogOpen}
        onRequestClose={::this.handleClose}
        autoScrollBodyContent={true}
      >
        <ReportForm />
      </Dialog>
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <GoogleMap
            ref={'map'}
            options={::this.getMapOptions()}
            defaultZoom={16}
            center={this.state.center}
            onBoundsChanged={::this.onBoundsChanged}>
            {this.renderCurrentLocationMarker()}
            {this.renderReportDialog()}
          </GoogleMap>
        </div>
      </MuiThemeProvider>
    );
  }
}

const ReportMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg&v=3.exp&libraries=geometry,drawing,places',
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  {
    return (<MapWithReport {...props} />);
  }
);

export default ReportMap;