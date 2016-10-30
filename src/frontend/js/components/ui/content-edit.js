import classNames from 'classnames';
import React from 'react'

import { Card } from "../ui/card"
import { CardBlock } from "../ui/card-block"
import { ImagePanelRevision } from "../ui/image-panel-revision"
import { FlickrSelector } from "../ui/flickr-selector"
import { Spinner } from "../ui/spinner"

const ContentEdit = React.createClass({

    propTypes: {
        handleFieldChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
        id: React.PropTypes.string
    },
    handleClickSelect: function(event) {
        this.props.handleFieldChange({
            target: {
                id: this.props.id,
                value: event.target.src
            }
        });
    },
    render: function() {
        let className = classNames([this.props.className, 'content'])
        let that = this;
        return (
            <div className={ className }>
                <Card>
                    <CardBlock>
                        <div className="text-align-center">
                            <ImagePanelRevision src={ this.props.value } />
                        </div>
                    </CardBlock>
                    <CardBlock>
                        <input
                            className="form-control"
                            id={ that.props.id }
                            type="text"
                            value={ this.props.value }
                            onChange={ that.props.handleFieldChange }
                        />
                    </CardBlock>
                    <CardBlock>
                        <FlickrSelector
                            onClick={ that.handleClickSelect }
                        />
                    </CardBlock>
                </Card>
            </div>
        );
    }
})

module.exports.ContentEdit = ContentEdit
