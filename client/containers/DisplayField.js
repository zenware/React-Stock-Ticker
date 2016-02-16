import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
  render() {
    var tickers = this.props.tickers;
    if (tickers.length === 0) {
      return <div className="display-field"></div>;
    } else {
      return (
        <div className="display-field">
        <ul>
          { tickers.map(x => <StockTicker key={x} ticker={x}/>)}
        </ul>
        </div>
      );
    }
  }
});
