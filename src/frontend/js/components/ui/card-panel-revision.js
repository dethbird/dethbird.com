import { browserHistory, Link } from 'react-router'
import classNames from 'classnames';
import React from 'react'
import TimeAgo from 'react-timeago'

import { Card } from "../ui/card"
import { CardActionsButton } from "../ui/card-actions-button"

import { CardActions, CardText, CardTitle } from 'material-ui/Card';

import { Image } from "../ui/image"
import { Description } from "../ui/description"

const CardPanelRevision = React.createClass({

    propTypes: {
        revision: React.PropTypes.object.isRequired,
        link: React.PropTypes.string.isRequired,
        index: React.PropTypes.number
    },

    handleClick: function(link) {
        browserHistory.push(link);
    },

    render: function() {
        const { revision, link, index } = this.props;

        return (
            <Card
                className={ classNames(['panel-revision']) }
            >
                <CardTitle
                    title={ `Revision ${index}` }
                    className='text-align-left card-title'
                />
                <Image src={ revision.content } />
                <Description source={ revision.description } />
                <CardActions className="text-align-right">
                    <CardActionsButton
                        title="Edit"
                        onTouchTap={ this.handleClick.bind(this, link) }
                    />
                </CardActions>
            </Card>
        );
    }
})

export default CardPanelRevision;
