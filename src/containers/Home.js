import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as counterActions from '@/redux_modules/counter';

@connect(
  state => ({
    counter: state.counter,
  }),
  counterActions
)
export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello React! ({this.props.counter.count})</h1>
        <Button
          onClick={() => this.props.decrementCounter()}
          disabled={this.props.counter.isLoading}
        >
          -
        </Button>
        <Button
          onClick={() => this.props.delayedIncrementCounter()}
          disabled={this.props.counter.isLoading}
        >
          +
        </Button>
      </div>
    );
  }
}

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