import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'
import Footer from './Footer'

module.exports = React.createClass({
    componentDidMount() {
        var ping = Math.floor(Math.random() * 10000);
        setInterval(this.updateStocks, (ping > 5000 ? ping : 7500));
    },
    getInitialState() {
      return {
        search: '',
        stocks: []
      };
    },
    handleChange(e) {
      this.setState({
        search: e.target.text;
      });
    },
    handleSubmit(e) {
        e.preventDefault();
        var queryURL = '/v1/stocks/';
        var symbol = this.state.search.toUpperCase();
        var stocks = this.state.stocks;
        var self = this;

        if (!this.validateInput(symbol)) {
            alert("It already exists!");
            return this.setState({
                symbol: ''
            });
        }

        request
            .get(queryURL + symbol)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                }
                if (res.status === 400) {
                    alert("Stock symbol doesn't exist, try another one.");
                    self.setState({
                        symbol: ''
                    });
                } else {
                    self.setState({
                        symbol: '',
                        stocks: res.body.stocks
                    });
                }
            });
    },
    formatSymbols(array) {
      return array.map(function (x) {
        x = x.t;
      }).toString();
    },
    updateStocks() {
        var stocks = this.state.stocks;
        var batch = this.formatSymbols(stocks);
        console.log(batch.length);
        var queryURL = '/v1/stocks/' + batch;
        var self = this;
        request
            .get(queryURL)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                  console.log(err);
                } else {
                    self.setState({
                        stocks: res.body.stocks
                    });
                }
            });
    },
    validateInput(input) {
        return this.state.stocks.map(function (x) {
          if (x.t === input) {
            return false;
          }
        });
        return true;
    },
    render: function() {
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

