import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
    render() {
      var tickers = this.props.tickers;
      if (tickers.length < 1) {
        return <div className="displa-field"></div>;
      }
      return (
        <div className="display-field">
        <ul>
          { tickers.map(x => <StockTicker ticker={x}/>) }
        </ul>
        </div>
      )
    }
});
