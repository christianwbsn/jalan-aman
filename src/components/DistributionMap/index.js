import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

export class MapContainer extends Component {
  static propTypes = {
    google: PropTypes.obj,
    markers: PropTypes.obj,
    initialPosition: PropTypes.obj,
    initialZoom: PropTypes.number,
  };

  static defaultProps = {
    markers: [
      {
        position: {
          lat: -6.8773826,
          lng: 107.60341790000007,
        },
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      },
    ],
    initialPosition: {
      lat: -6.8773826,
      lng: 107.60341790000007,
    },
    initialZoom: 14,
  };

  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialPosition;
    this.state = {
      currentLocation: {
        lat,
        lng,
      },
      isPaneOpen: false,
    };
  }

  renderMarker(marker) {
    const { position, icon } = marker;

    return <Marker position={position} icon={icon} onClick={() => alert('kepencet')}/>;
  }

  render() {
    const { markers } = this.props;

    const style = {
      width: '100wh',
    };

    return (
      <View>
        <Button
          onClick={() => {
            this.setState({ isPaneOpen: true}) }
          } />
        <Map
          google={this.props.google}
          zoom={16}
          style={style}
          initialCenter={{
            lat: -6.8773826,
            lng: 107.6034179,
          }}>
        {markers.map(marker => this.renderMarker(marker))}
        </Map>
        <SlidingPane
            isOpen={ this.state.isPaneOpen }
            title='Hey, it is optional pane title.  I can be React component too.'
            subtitle='Optional subtitle.'
            onRequestClose={ () => {
                // triggered on "<" on left top click or on outside click
                this.setState({ isPaneOpen: false });
            } }>
            <div>And I am pane content. BTW, what rocks?</div>
            <br />
        </SlidingPane>
      </View>
    );
  }
};

const View = styled.div`
  padding-left: 20;
  background-color: yellow;
`;

const Button = styled.button`
  padding: .5rem 1rem;
  background: ${props => props.theme.primary};
  font-size: 1.5rem;
  border-radius: 50%;
  font-weight: bold;
  border: 0;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-left: .5rem;
  }

  &:disabled {
    color: ${props => props.theme.blackTransparent};
  }
`;


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg',
})(MapContainer);
