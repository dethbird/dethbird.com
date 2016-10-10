import React from 'react'
import { Link } from 'react-router'


const ScriptBreadcrumb = React.createClass({
    propTypes: {
        script: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/scripts">Scripts</Link></li>
                <li className="breadcrumb-item">{ this.props.script.name }</li>
            </ol>
        );
    }
})

module.exports.ScriptBreadcrumb = ScriptBreadcrumb
