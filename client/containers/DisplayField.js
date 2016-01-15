import React, { Component } from 'react'

module.exports = React.createClass({
    render: function() {
        return (<ul className="display-field">
            { this.props.stocks.map(x => 
                <li className="list-item">
                    { x.t } 
                    <i className={"angle fa fa-angle-double-" +(x.c.indexOf('-') > -1 ? 
                        'down angle-red' : 
                        'up angle-green')}>
                    </i> 
                    <br />
                    Exchange: { x.e }
                    <br />
                    Price: { x.l }
                    <br />
                    CHG: { x.c } ({x.cp}%)
                </li>
            ) }
        </ul>)
    }
});