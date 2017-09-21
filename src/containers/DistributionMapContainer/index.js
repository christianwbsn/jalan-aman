import React, { Component } from 'react';
import styled from 'styled-components';
import CrimeMap from '../../components/CrimeMap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as reportActions from '../../redux_modules/report';

@connect(
  state => ({
    reportState: state.reportState,
  }),
  reportActions
)
export default class DistributionMapContainer extends Component {
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
          <div>
            <CrimeMap reports={this.props.reportState.reports} />
          </div>
        </div>
      </div>
    );
  }
}
