import React, { Component } from 'react'
import DisplayField from './DisplayField'
import Footer from './Footer'

module.exports = React.createClass({
  getInitialState() {
    return {
      search: '',
      tickers: ['null']
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
    if (!this.state.tickers.indexOf(search)) {
      alert("It already exists!");
      this.setState({
        search: ''
      });
    } else {
      this.addStockTicker(search);
    }
  },
  addStockTicker(newTicker) {
    var newArray = this.state.tickers.slice()
    newArray.push(newTicker)
    this.setState({
      search: '',
      tickers: newArray
    })
  },
  render() {
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
        <DisplayField tickers={ this.state.tickers } />
        <Footer />
      </div>
    );
  }
});

