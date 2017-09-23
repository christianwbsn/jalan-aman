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

function getFormattedDate(date) {
  const bulan = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const s = date.split('-');
  return `${s[0]} ${bulan[parseInt(s[1]) - 1]} ${s[2]}`;
}

class MapWithDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogOpen: false,
      bounds: null,
      center: this.props.center,
      markers: [],
      dialogContent: {
        title: '',
        parsedDate: '',
        parsedTime: '',
        address: '',
        description: '',
        id: '',
      },
    };

    this.renderDialogContent = this.renderDialogContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.center !== nextProps.center) {
      this.setState({ center: nextProps.center });
    }
  }

  onBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter(),
    });
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

  onMarkerClick(report) {
    const { title, datetime, address, description, id } = report;
    const parsedDate = getFormattedDate(datetime.split(' ')[0]);
    const parsedTime = datetime.split(' ')[1];

    this.setState({
      dialogContent: {
        title,
        parsedTime,
        parsedDate,
        address,
        description,
      },
    });
    this.handleOpen();
  }

  renderDialogContent() {
    const { title, parsedDate, parsedTime, address, description, id } = this.state.dialogContent;

    return (
      <div>
        <h4>{title}</h4>
        <h4>{parsedDate}</h4>
        <h4>{parsedTime}</h4>
        <h4>{address}</h4>
        <h4>{description}</h4>
      </div>
    );
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
            onBoundsChanged={::this.onBoundsChanged}
          >
            {
              this.props.reports.map((report, key) => {
                return (
                  <Marker
                    key={key}
                    position={report.position}
                    icon={report.icon}
                    onClick={() => ::this.onMarkerClick(report)}
                  />
                );
              })
            }
          </GoogleMap>
          <Dialog
            title="Detail Kejahatan"
            modal={false}
            open={this.state.isDialogOpen}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            {this.renderDialogContent()}
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