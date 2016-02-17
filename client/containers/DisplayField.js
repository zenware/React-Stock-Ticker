import React, { Component } from 'react'
import StockTicker from './StockTicker'

module.exports = React.createClass({
  render() {
    return (
      <div className="display-field">
      <ul>
        {
          this.props.stocks.map(x =>
            <StockTicker className='list-item' key={x.t} stock={x}/>
          )
        }
      </ul>
      </div>
    );
  }
});
