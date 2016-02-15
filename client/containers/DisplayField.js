import React, { Component } from 'react'

// TODO: This should be actually where the pollInterval property gets set and the API called to populate with some results, and then the other react class <App> will just create more of these children...
// there could also be a delete button that allows these to be removed on the fly.
module.exports = React.createClass({
    render: function() {
        var hyperlink = 'https://www.google.com/finance?q=';
        var stocks = this.props.stocks;
        return (<ul className="display-field">
            { stocks.map(x =>
                <li key="x.id" className="list-item">
                    <a href={ hyperlink + x.t }
                        target="_blank">
                        { x.t }
                    </a>
                    <i className={"angle fa fa-angle-double-" +(x.c.indexOf('-') > -1 ?
                        'down angle-red' :
                        'up angle-green')}>
                    </i>
                    <br />
                    Exchange: { x.e }
                    <br />
                    Price: { x.l }
                    <br />
                    Change: { x.c } ({x.cp}%)
                </li>
            ) }
        </ul>)
    }
});
