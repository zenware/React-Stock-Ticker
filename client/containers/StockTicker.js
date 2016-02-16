import React, { Component } from 'react'

module.exports = React.createClass({
 render() {
    var hyperlink = 'https://www.google.com/finance?q=';
    var stock = this.props.stock;
    return (
      <div className='stock-ticker'>
      <li className="list-item">
        <a href={ hyperlink + stock.t }
          target="_blank">
          { stock.t }
        </a>
        <i className={"angle fa fa-angle-double-" +(stock.c.indexOf('-') > -1 ?
            'down angle-red' :
            'up angle-green')}>
        </i>
        <br />
        Exchange: { stock.e }
        <br />
        Price: { stock.l }
        <br />
        Change: { stock.c } ({stock.cp}%)
      </li>
      </div>
    );
  }
});
