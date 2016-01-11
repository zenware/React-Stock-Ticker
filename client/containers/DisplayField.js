import React, { Component } from 'react'

module.exports = React.createClass({
    render: function() {
        return (<ul>
            <li>This is supposed to be the display field</li>
            { this.props.stocks.map(x => 
                <li className="list-itm">
                    Symbol: { x.t }
                    <br />
                    Price: { x.l }
                    <br />
                    Change: { x.c } ({x.cp}%)
                </li>
            ) }
        </ul>)
    }
});