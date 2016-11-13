import classNames from 'classnames';
import fountainJs from 'fountain-js'
import React from 'react'


const Fountain = React.createClass({

    propTypes: {
        source: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function() {

        const { className, source } = this.props;

        if (!source)
            return null;

        let script = { __html: '<div></div>' }

        if (source) {
            script = {
                __html: fountainJs.parse(
                    source).script_html
            }
            return (
                <div
                    className={ classNames([className, 'fountain']) }
                    dangerouslySetInnerHTML={ script }
                >
                </div>
            );
        }
        return null;
    }
})

module.exports.Fountain = Fountain
