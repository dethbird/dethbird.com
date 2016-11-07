import React from 'react'
import { Link } from 'react-router'

const ScriptBreadcrumb = React.createClass({
    propTypes: {
        script: React.PropTypes.object
    },

    render: function() {
        const { script } = this.props;
        if (!script) {
            return <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/scripts">Scripts</Link></li>
                <li className="breadcrumb-item">Add</li>
            </ol>;
        }
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/scripts">Scripts</Link></li>
                <li className="breadcrumb-item">{ script.name }</li>
            </ol>
        );
    }
})

module.exports.ScriptBreadcrumb = ScriptBreadcrumb
