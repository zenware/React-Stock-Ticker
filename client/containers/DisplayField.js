import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
    render() {
      var tickers = this.props.tickers;
      return (
        <ul className="display-field">
          { tickers.map(x => <StockTicker key={x} ticker={x}/>) }
        </ul>
      )
    }
});
