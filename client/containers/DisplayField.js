import React, { Component } from 'react'
import StockTickerList from './StockTickerList'

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
