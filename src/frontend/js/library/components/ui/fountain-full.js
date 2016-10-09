import classNames from 'classnames';
import fountainJs from 'fountain-js'
import React from 'react'


const FountainFull = React.createClass({

    propTypes: {
        source: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function() {
        let className = classNames([this.props.className, 'fountain'])

        let script = { __html: '<div></div>' }
        let title = { __html: '<div></div>' }

        if (this.props.source) {
            script = {
                __html: fountainJs.parse(
                    this.props.source).script_html
            }
            title = {
                __html: fountainJs.parse(
                    this.props.source).title_page_html
            }
        }

        return (
            <section className={ className }>
                <div
                    dangerouslySetInnerHTML={ title }
                >
                </div>
                <hr />
                <div
                    dangerouslySetInnerHTML={ script }
                >
                </div>
            </section>

        );
    }
})

module.exports.FountainFull = FountainFull
