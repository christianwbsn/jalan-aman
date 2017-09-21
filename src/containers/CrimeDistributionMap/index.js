import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MapWithDialogWrapper from '../../components/CrimeMap';
import * as reportActions from '../../redux_modules/report';

@connect(
  state => ({
    reportState: state.reportState,
  }),
  reportActions
)
export default class CrimeDistributionMap extends Component {
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
  }

  render() {
    return (
      <div>
        <div>
          <MapWithDialogWrapper
            reports={this.props.reportState.reports}
            onMarkerClick={this.onMarkerClick}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '800px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            center={{ lat: -6.877542, lng: 107.6036 }}
          />
        </div>
      </div>
    );
  }
}
