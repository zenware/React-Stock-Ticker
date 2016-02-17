import React, { Component } from 'react'
import DisplayField from './DisplayField'
import Footer from './Footer'
import request from 'superagent'

module.exports = React.createClass({
  componentDidMount() {
    setInterval(this.updateStocks, 1000);
  },
  updateStocks() {
    var query = this.state.tickers.toString();
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
  getInitialState() {
    return {
      search: '',
      tickers: ['null'],
      stocks: []
    };
  },
  handleChange(e) {
    this.setState({
      search: e.target.value
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    var search = this.state.search.toUpperCase();
    if (this.state.tickers.indexOf(search) === -1) {
      this.addStockTicker(search);
    } else {
      alert('exists')
    }
    this.updateStocks();
  },
  addStockTicker(newTicker) {
    var newArray = this.state.tickers.slice();
    newArray.push(newTicker)
    this.setState({
      search: '',
      tickers: newArray
    })
  },
  render() {
   if (this.state.stocks == undefined) {
     return (
      <div className="main">
        <div className="box">
          <form className="container-1" onSubmit={ this.handleSubmit }>
            <span className="search-icon"><i className="fa fa-search"></i></span>
            <input id="search" type="text"
                   value={ this.state.search }
                   onChange={ this.handleChange }
                   placeholder="Search..." />
          </form>
        </div>
        <Footer />
      </div>
     );
   }
   return (
      <div className="main">
        <div className="box">
          <form className="container-1" onSubmit={ this.handleSubmit }>
            <span className="search-icon"><i className="fa fa-search"></i></span>
            <input id="search" type="text"
                   value={ this.state.search }
                   onChange={ this.handleChange }
                   placeholder="Search..." />
          </form>
        </div>
        <DisplayField stocks={ this.state.stocks } />
        <Footer />
      </div>
    );
  }
});

