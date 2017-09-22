/* eslint-disable */
import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

class MapWithDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogOpen: false,
      dialogContent: {}
    }
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
            options={options}
            defaultZoom={16}
            center={this.props.center}>
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