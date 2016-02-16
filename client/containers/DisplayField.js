import React, { Component } from 'react'
import StockTicker from './StockTicker'
import request from 'superagent'

module.exports = React.createClass({
  render() {
    return (
      <div className="display-field">
      <ul>
        { this.props.stocks.map(x => <StockTicker key={x.t} stock={x}/>)}
      </ul>
      </div>
    );
  }
});
