import React, { Component } from 'react'
import DisplayField from './DisplayField'
import Footer from './Footer'

module.exports = React.createClass({
  getInitialState() {
    return {
      search: 'GOOG',
      tickers: [],
    };
  },
  handleChange(e) {
    this.setState({
      search: e.target.value.toUpperCase()
    });
  },
  handleSubmit(e) {
      e.preventDefault();
      var search = this.state.search;
      if (!this.validateInput(search)) {
          alert("It already exists!");
          return this.setState({
            search: ''
          });
      }
      this.addStockTicker(search);
      this.setState({
        search: ''
      });
  },
  addStockTicker(newTicker) {
    var newArray = this.state.tickers.slice();
    newArray.push(newTicker);
    this.setState({tickers:newArray});
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
        <DisplayField tickers={ this.state.tickers } />
        <Footer />
      </div>
    );
  }
});

