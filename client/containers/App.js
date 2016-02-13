import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'
import Footer from './Footer'

module.exports = React.createClass({
    componentDidMount: function() {
        var ping = Math.floor(Math.random() * 10000);
        setInterval(this.updateStocks, (ping > 5000 ? ping : 7500));
    },
    getInitialState: function() {
        return {
            symbol: '',
            stocks: []
        };
    },
    handleChange: function(e) {
        this.setState({
            symbol: e.target.value
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var queryURL = 'https://finance.google.com/finance/info?client=ig&q=';
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
                    var a = res.text.split('');
                    var data = JSON.parse(a.slice(6, a.length - 2).join(''));
                    stocks.unshift(data);
                    if (stocks.length > 6) stocks = stocks.slice(0, 6);
                    self.setState({
                        symbol: '',
                        stocks: stocks
                    });
                }
            });
    },
    formatSymbols: function (array) {
        var stocks = "";
        for (var i = 0; i < array.length; ++i) {
            if (i == array.length - 1) {
                stocks += array[i].t;
                break;
            }
            stocks += array[i].t + ',';
        }
        return stocks;
    },
    updateStocks: function() {
        var stocks = this.state.stocks;
        var batch = this.formatSymbols(stocks);
        var queryURL = 'https://finance.google.com/finance/info?client=ig&q=' + batch;
        var self = this;
        request
            .get(queryURL)
            .end(function(err, res) {
                if (err) { console.log(err); }
                else {
                    var a = res.text.split('');
                    var data = a.slice(3, a.length).join('');
                    // Add conditional to only display last 6 stocks
                    self.setState({
                        stocks: JSON.parse(data)
                    });
                }
            });
        // console.log('This is firing');
    },
    validateInput: function(input) {
        var stocks = this.state.stocks;
        for (var i = 0; i < stocks.length; ++i) {
            if (input === stocks[i].t) {
                return false;
            }
        }
        return true;
    },
    render: function() {
        return (<div className="main">
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
        </div>);
    }
});