import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
  render() {
    return this.props.tickers.map(
      x => {
        <StockTicker key={x} ticker={x}/>
      }
    );
  }
});

