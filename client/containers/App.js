import React, { Component } from 'react'
import request from 'superagent'
import DisplayField from './DisplayField'

module.exports = React.createClass({
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
        e.preventDefault();
        request
            .get(queryURL + symbol)
            .end(function(err, res) {
                if (err) { console.log(err); }
                else {
                    var a = res.text.split('');
                    var data = JSON.parse(a.slice(6, a.length - 2).join(''));
                    stocks.push(data);
                    console.log(stocks);
                }
            });
        this.setState({
            symbol: '',
            stocks: stocks
        });
    },
    render: function() {
        return (<div className="main-container">
            <form onSubmit={ this.handleSubmit }> 
                <input type="text" value={ this.state.symbol } onChange={ this.handleChange } />
                <button>Search</button>
            </form>
            <DisplayField stocks={ this.state.stocks } />
        </div>);
    }
});