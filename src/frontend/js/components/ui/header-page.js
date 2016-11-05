import React from 'react'


const HeaderPage = React.createClass({


    propTypes: {
        title: React.PropTypes.string
    },

    render: function() {
        const { title, children } = this.props;

        return (
            <div className="header-page clearfix">
                <span className="header-page-title pull-left">{ title }</span>
                <div className="pull-right">{ children }</div>
            </div>
        );
    }
})

module.exports.HeaderPage = HeaderPage
