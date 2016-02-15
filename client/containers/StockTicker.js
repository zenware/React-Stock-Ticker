import React, { Component } from 'react'
import request from 'superagent'

module.exports = React.createClass({
  componentDidMount() {
    this.updateStock();
    setInterval(this.updateStock, 60000);
  },
  getInitialState() {
    return {
      stock: {}
    };
  },
  updateStock() {
    request
      .get(`/v1/stocks/${this.props.ticker}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            stock: res.body.stocks[0]
          });
        }
    });

  },
  render() {
    var hyperlink = 'https://www.google.com/finance?q=';
    var stock = this.state.stock;
    if (stock == undefined) {
      return (<div className='stock-ticker'></div>);
    }
    return (
      <div className='stock-ticker'>
      <li className="list-item">
        <a href={ hyperlink + stock.t }
          target="_blank">
          { stock.t }
        </a>
        <i className={"angle fa fa-angle-double-" +(stock.c.indexOf('-') > -1 ?
            'down angle-red' :
            'up angle-green')}>
        </i>
        <br />
        Exchange: { stock.e }
        <br />
        Price: { stock.l }
        <br />
        Change: { stock.c } ({stock.cp}%)
      </li>
      </div>
    )
  }
});
