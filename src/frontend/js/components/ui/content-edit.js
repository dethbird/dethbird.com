import classNames from 'classnames';
import React from 'react'

import { Card } from "../ui/card"
import { CardBlock } from "../ui/card-block"
import { Image } from "../ui/image"
import InputText from "../ui/input-text"
import FlickrSelector from "../ui/flickr-selector"
import { Spinner } from "../ui/spinner"

const ContentEdit = React.createClass({

    propTypes: {
        handleFieldChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
        id: React.PropTypes.string
    },
    handleClickSelect: function(value) {
        const { id } = this.props;

        this.props.handleFieldChange({
            target: {
                id,
                value
            }
        });
    },
    render: function() {
        const { id, value, handleFieldChange } = this.props;
        return (
            <div className="content">
                <Image src={ value } />
                <br />
                <InputText
                    label="Url"
                    id={ id }
                    value={ value || '' }
                    onChange= { handleFieldChange }
                />
                <br />
                <div>
                    <FlickrSelector
                        onClick={ this.handleClickSelect }
                    />
                </div>
            </div>
        );
    }
})

module.exports.ContentEdit = ContentEdit
