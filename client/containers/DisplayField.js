import React, { Component } from 'react'
import request from 'superagent'

module.exports = React.createClass({
  componentWillMount() {
    this.updateStocks();
    setInterval(this.updateStocks, 60000);
  },
  updateStocks() {
    request
      .get(`/v1/stocks/${this.props.tickers}`)
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
    var stocks = this.state.stocks;
    if (typeof stocks == 'null') {
      return <div className="display-field"></div>;
    } else {
      return (
        <div className="display-field">
        <ul>
          { stocks.map(x => <StockTicker key={x.t} stock={x}/>)}
        </ul>
        </div>
      );
    }
  }
});
