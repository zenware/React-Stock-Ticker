import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'

module.exports = React.createClass({
    componentDidMount: function() {
        var ping = Math.floor(Math.random() * 7000);
        setTimeout(this.updateStocks, ping);
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
        var queryURL = 'https://finance.google.com/finance/info?client=ig&q=';
        var symbol = this.state.symbol.toUpperCase();
        var stocks = this.state.stocks;
        var ping = Math.floor(Math.random() * 7000);
        var self = this;
        e.preventDefault();
        request
            .get(queryURL + symbol)
            .end(function(err, res) {
                if (err) { console.log(err); }
                else {
                    var a = res.text.split('');
                    var data = JSON.parse(a.slice(6, a.length - 2).join(''));
                    stocks.push(data);
                    self.setState({
                        symbol: '',
                        stocks: stocks
                    });
                }
            });

    },
    updateStocks: function() {
        var queryURL = 'https://finance.google.com/finance/info?client=ig&q=';
        var stocks = this.state.stocks;
        var updatedStocks = [];
        stock.forEach(function(x) {
            request
                .get(queryURL + x.t)
                .end(function(err, res) {
                    if (err) { console.log(err); }
                    else {
                        var a = res.text.split('');
                        var data = JSON.parse(a.slice(6, a.length - 2).join(''));
                        updatedStocks.push(data);
                    }
                });
        });
        this.setState({
            stocks: updatedStocks
        });
    },
    render: function() {
        return (<div className="main">
            <div className="box">
                <form className="container-1" onSubmit={ this.handleSubmit }> 
                    <span className="search-icon"><i className="fa fa-search"></i></span>
                    <input id="search" type="text" value={ this.state.symbol } onChange={ this.handleChange } />
                </form>
            </div>
            <DisplayField stocks={ this.state.stocks } />
        </div>);
    }
});