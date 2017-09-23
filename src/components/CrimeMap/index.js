import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
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

class MapWithDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogOpen: false,
      dialogContent: {},
      bounds: null,
      center: this.props.center,
      markers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (this.props.center !== nextProps.center) {
      this.setState({ center: nextProps.center });
    }
  }

  onMapMounted(ref) {
    this.refs.map = ref;
  }

  onBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter(),
    });
  }

  onSearchBoxMounted(ref) {
    this.refs.searchBox = ref;
  }

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

  handleOpen = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    const options = {
      gestureHandling: 'greedy',
      mapTypeControl: false,
    };

    return (
      <MuiThemeProvider>
        <div>
          <GoogleMap
            ref={'map'}
            options={options}
            defaultZoom={16}
            center={this.state.center}
            onBoundsChanged={::this.onBoundsChanged}>
            <SearchBox
              ref={'searchBox'}
              bounds={this.state.bounds}
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              onPlacesChanged={::this.onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  marginTop: `27px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                }}
              />
            </SearchBox>
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
      </MuiThemeProvider>
    );
  }
}

const CrimeMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg&v=3.exp&libraries=geometry,drawing,places',
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  {
    return (<MapWithDialog {...props} />);
  }
);

export default CrimeMap;