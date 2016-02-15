import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
    render() {
      if (this.props.tickers.length === 0) {
        return <div className="display-field"></div>;
      }
      return (
        <div className="display-field">
        <ul>
          {
            this.props.tickers.map(x => {
              return <StockTicker key={x} ticker={x}/>
            })
          }
        </ul>
        </div>
      )
    }
});
