import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MapWithDialogWrapper from '../../components/CrimeMap';
import * as reportActions from '../../redux_modules/report';

@connect(
  state => ({
    reportState: state.reportState,
    navHeight: state.navState.navHeight,
  }),
  reportActions
)
class CrimeDistributionMap extends Component {
  static propTypes = {
    reportState: PropTypes.shape({
      reports: PropTypes.array,
      isLoading: PropTypes.bool,
    }).isRequired,
    loadReports: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.loadReports();

    this.state = {
      containerHeight: 400,
      center: {
        lat: -6.777542,
        lng: 107.6036,
      },
    };

    this.onGetLocationSuccess = this.onGetLocationSuccess.bind(this);
  }

  componentDidMount() {
    // const clientHeight = this.refs.mapz.clientHeight;
    // this.setState({ containerHeight: clientHeight });
    this.getCurrentPosition();
  }

  onGetLocationSuccess(position) {
    const { latitude, longitude } = position.coords;
    this.setState({ center: { lat: latitude, lng: longitude } });
  }

  getCurrentPosition() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onGetLocationSuccess, () => {});
    }
  }

  render() {
    return (
      <div>
        <View>
          <MapWithDialogWrapper
            reports={this.props.reportState.reports}
            onMarkerClick={this.onMarkerClick}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            center={this.state.center}
          />
        </View>
      </div>
    );
  }
}

const View = styled.div`
  height: 600px;
  background-color: yellow;
`;

export default CrimeDistributionMap;