import classNames from 'classnames';
import React from 'react'
import { Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardBlock } from "../../ui/card-block"
import { Description } from "../../ui/description"
import { SectionHeader } from "../../ui/section-header"


const Script = React.createClass({
    propTypes: {
      script: React.PropTypes.object.isRequired,
      className: React.PropTypes.string
    },

    render: function() {
        let that = this
        let className = classNames([this.props.className, 'script'])

        return (
            <Card
                className={ className }
                key={ this.props.script.id }
            >
                <section className="clearfix card-block">
                    <div className="pull-left col-xs-6">
                        <h3>{ this.props.script.name }</h3>
                    </div>
                    <div className="pull-right">
                        <div className="btn-group">
                            <Link
                                to={
                                    '/script/' + this.props.script.id
                                }
                                className="btn btn-secondary"
                            >View</Link>
                            <Link
                                to={
                                    '/script/' + this.props.script.id
                                    + '/edit'
                                }
                                className="btn btn-info"
                            >Edit</Link>
                        </div>
                    </div>
                </section>

            </Card>
        );
    }
})

module.exports.Script = Script
