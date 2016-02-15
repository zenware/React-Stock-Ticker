import React, { Component } from 'react'
import StockTickerList from './StockTickerList'

module.exports = React.createClass({
    render() {
      if (this.props.tickers.length === 0) {
        return <div className="display-field"></div>;
      }
      return (
        <div className="display-field">
        <ul>
          { <StockTickerList tickers={this.props.tickers}/> }
        </ul>
        </div>
      )
    }
});
