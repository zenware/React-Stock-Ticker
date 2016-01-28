import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'

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
        var queryURL = 'https://finance.google.com/finance/info?client=ig&q=';
        var symbol = this.state.symbol.toUpperCase();
        var stocks = this.state.stocks;
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
        var self = this;
        stocks.forEach(function(x) {
            request
                .get(queryURL + x.t)
                .end(function(err, res) {
                    if (err) { console.log(err); }
                    else {
                        var a = res.text.split('');
                        var data = JSON.parse(a.slice(6, a.length - 2).join(''));
                        updatedStocks.push(data);
                        self.setState({
                            stocks: updatedStocks
                        });
                    }
                });
        });
        console.log('This is firing');
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