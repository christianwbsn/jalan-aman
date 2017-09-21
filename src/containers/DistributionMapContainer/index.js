import React, { Component } from 'react';
import styled from 'styled-components';
import CrimeMap from '../../components/CrimeMap';

export default class DistributionMapContainer extends Component {
  render() {
    return (
      <div>
        <View>
          <div>
            <CrimeMap />
          </div>
        </View>
      </div>
    );
  }
}

const View = styled.div`
  background-color: yellow;
`;
