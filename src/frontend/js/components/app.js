import React from 'react';
import { Link } from 'react-router'


const App = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
})

module.exports.App = App
