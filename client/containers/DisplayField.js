import React, { Component } from 'react'

module.exports = React.createClass({
    render: function() {
        var hyperlink = 'https://www.google.com/finance?q=';
        return (<ul className="display-field">
            { this.props.stocks.map(x =>
                <li className="list-item">
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
