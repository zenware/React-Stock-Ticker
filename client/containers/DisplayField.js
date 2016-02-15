import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
    render() {
      var tickers = this.props.tickers;
      if (tickers.length < 1) {
        return <div className="display-field"></div>;
      }
      return (
        <div className="display-field">
        <ul>
          { <StockTickerList tickers={x}/> }
        </ul>
        </div>
      )
    }
});
