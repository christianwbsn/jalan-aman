import React, { Component } from 'react';
import styled from 'styled-components';
import DistributionMap from '../../components/DistributionMap';
import NaiveMap from '../../components/NaiveMap';

export default class DistributionMapContainer extends Component {
  render() {
    return (
      <div>
        <h1>Jalan Aman</h1>
        <View>
          <div>
            <NaiveMap />
          </div>
        </View>
      </div>
    );
  }
}

const View = styled.div`
  background-color: yellow;
`;
