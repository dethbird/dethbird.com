import classNames from 'classnames';
import React from 'react'
import TimeAgo from 'react-timeago'

import { Card } from "../../ui/card"
import { CardBlock } from "../../ui/card-block"
import { CardComment } from "../../ui/card-comment"
import { Count } from "../../ui/count"
import { Description } from "../../ui/description"
import { Fountain } from "../../ui/fountain"
import { ImagePanelRevision } from "../../ui/image-panel-revision"

const PanelModal = React.createClass({

    propTypes: {
        panel: React.PropTypes.object.isRequired,
        handleClickClose: React.PropTypes.func.isRequired,
        className: React.PropTypes.string
    },
    handleClose: function(panel_id) {
        console.log(panel_id)
        this.props.handleClickClose(panel_id)
    },
    render: function() {
        let props = {};
        if (this.props.panel.revisions.length > 0)
            props.src = this.props.panel.revisions[0].content

        let panelRevisionNodes = this.props.panel.revisions.map(function(revision) {
            let props = {};
                props.src = revision.content
            return (
                <Card
                    className="col-xs-4"
                    key={ revision.id }
                >
                    <ImagePanelRevision { ...props } ></ImagePanelRevision>
                    <CardBlock>
                        <Description source={ revision.description } />
                    </CardBlock>
                </Card>
            );
        });

        let panelCommentNodes = this.props.panel.comments.map(function(comment) {
            return (
                <CardComment comment={ comment } link='#'
                key={ comment.id } />
            );
        });

        return (
            <div>
                <div className="text-align-center">
                    <a className="btn btn-secondary"
                        onClick={ this.handleClose.bind(this, this.props.panel.id)}
                    >Close</a>
                </div>
                <Card
                    className='storyboard-panel'
                >
                    <h3 className='card-header'>{ this.props.panel.name }</h3>
                    <div className="text-align-center">
                        <ImagePanelRevision { ...props } />
                    </div>
                    <CardBlock>
                        <Fountain source={ this.props.panel.script }></Fountain>
                    </CardBlock>
                    <CardBlock>
                        { panelRevisionNodes }
                    </CardBlock>
                    <CardBlock>
                        { panelCommentNodes }
                    </CardBlock>
                </Card>
            </div>
        );
    }
})

module.exports.PanelModal = PanelModal
