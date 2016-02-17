import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
  render() {
    return (
      <ul className="display-field">
        {
          this.props.stocks.map(x =>
            <StockTicker key={x.t} stock={x}/>
          )
        }
      </ul>
    );
  }
});
