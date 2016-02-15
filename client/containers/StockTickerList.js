import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
  render() {
    return this.props.tickers.map(
      x => {
        <li key={x} className='list-item'><StockTicker ticker={x}/></li>
      }
    );
  }
});

