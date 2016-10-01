import classNames from 'classnames';
import React from 'react'

import { Card } from "../../ui/card"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { Description } from "../../ui/description"
import { Fountain } from "../../ui/fountain"
import { ImagePanelRevision } from "../../ui/image-panel-revision"

const PanelModal = React.createClass({

    propTypes: {
        panel: React.PropTypes.object.isRequired,
        className: React.PropTypes.string
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

        return (
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
                <div>
                    { panelRevisionNodes }
                </div>
            </Card>
        );
    }
})

module.exports.PanelModal = PanelModal
