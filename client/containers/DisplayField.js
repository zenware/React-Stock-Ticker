import React, { Component } from 'react'
import request from 'superagent'

module.exports = React.createClass({
  componentWillMount() {
    this.updateStocks();
    setInterval(this.updateStocks, 60000);
  },
  getInitialState() {
    return {
      stocks: []
    };
  },
  updateStocks() {
    var query = this.props.tickers.toString();
    request
      .get('/v1/stocks/' + query)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            stocks: res.body.stocks
          });
        }
    });
  },
  render() {
    if (!this.state.stocks) {
      return <div className="display-field"></div>;
    } else {
      return (
        <div className="display-field">
        <ul>
          { this.state.stocks.map(x => <StockTicker key={x.t} stock={x}/>)}
        </ul>
        </div>
      );
    }
  }
});
