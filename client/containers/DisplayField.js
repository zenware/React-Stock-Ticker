import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
    render() {
      var tickers = this.props.tickers;
      if (tickers.length < 1) {
        return;
      }
      return (
        <ul className="display-field">
          { tickers.map(x => <StockTicker ticker={x}/>) }
        </ul>
      )
    }
});
