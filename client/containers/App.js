import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'
import Footer from './Footer'

module.exports = React.createClass({
    componentDidMount() {
      this.updateStocks();
      setInterval(this.updateStocks, this.props.pollInterval);
    },
    getInitialState() {
      return {
        search: 'GOOG',
        tickers: [],
        stocks: []
      };
    },
    handleChange(e) {
      this.setState({
        search: e.target.value.toUpperCase()
      });
    },
    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateInput(symbol)) {
            alert("It already exists!");
        }

        this.addStockTicker(this.state.search);
        this.updateStocks();
    },
    addStockTicker(newTicker) {
      var newArray = this.state.tickers.slice();
      newArray.push(newTicker);
      this.setState({tickers:newArray});
    },
    updateStocks() {
      var tickers = this.state.tickers;
      var queryURL = '/v1/stocks/' + tickers.toString();
      request
        .get(queryURL)n
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
    validateInput(input) {
      return !this.state.tickers.includes(input);
    },
    render() {
        return (
	        <div className="main">
            <div className="box">
                <form className="container-1" onSubmit={ this.handleSubmit }>
                    <span className="search-icon"><i className="fa fa-search"></i></span>
                    <input id="search" type="text"
                        value={this.state.search} onChange={ this.handleChange }
                        placeholder="Search..." />
                </form>
            </div>
            <DisplayField stocks={ this.state.stocks } />
            <Footer />
          </div>
	      );
    }
});

