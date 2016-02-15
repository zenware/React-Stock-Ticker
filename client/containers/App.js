import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'
import Footer from './Footer'

module.exports = React.createClass({
    componentDidMount() {
        var ping = Math.floor(Math.random() * 10000);
        setInterval(this.updateStocks, (ping > 5000 ? ping : 7500));
    },
    handleChange(e) {
        this.setState({
            symbol: e.target.value
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        var queryURL = '/v1/stocks/';
        var symbol = this.state.symbol.toUpperCase();
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
                    console.log(res.text);
                    var a = res.text['stocks'].split('');
                    var data = a.slice(6, a.length - 2).join('');
                    stocks.unshift(data);
                    if (stocks.length > 6) stocks = stocks.slice(0, 6);
                    self.setState({
                        symbol: '',
                        stocks: stocks
                    });
                }
            });
    },
    formatSymbols(array) {
        return array.toString();
    },
    updateStocks() {
        var stocks = this.state.stocks;
        var batch = this.formatSymbols(stocks);
        var queryURL = '/v1/stocks/' + batch;
        var self = this;
        request
            .get(queryURL)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) { console.log(err); }
                else {
                    var a = res.text['stocks'].split('');
                    var data = a.slice(3, a.length).join('');
                    self.setState({
                        stocks: data
                    });
                }
            });
    },
    validateInput(input) {
        return this.state.stocks.includes(input);
    },
    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    },
    render: function() {
        return (
	        <div className="main">
            <div className="box">
                <form className="container-1" onSubmit={ this.handleSubmit }>
                    <span className="search-icon"><i className="fa fa-search"></i></span>
                    <input id="search" type="text"
                        value={ this.state.symbol } onChange={ this.handleChange }
                        placeholder="Search..." />
                </form>
            </div>
            <DisplayField stocks={ this.state.stocks } />
            <Footer />
          </div>
	      );
    }
});

