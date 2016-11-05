import { browserHistory, Link } from 'react-router'
import classNames from 'classnames';
import React from 'react'
import TimeAgo from 'react-timeago'

import { Card } from "../ui/card"
import { CardActionsButton } from "../ui/card-actions-button"

import { CardActions, CardText } from 'material-ui/Card';

import { Description } from "../ui/description"

const CardComment = React.createClass({

    propTypes: {
        comment: React.PropTypes.object.isRequired,
        link: React.PropTypes.string.isRequired
    },

    handleClick: function(link) {
        browserHistory.push(link);
    },

    render: function() {
        const { comment, link } = this.props;
        console.log(link);
        return (
            <Card
                className={ classNames(['comment', comment.status]) }
            >
                <CardText>
                    <Description source={ comment.comment } className={ classNames(['comment-comment', comment.status]) }/>
                    <span className="comment-user">{ comment.user.username }</span>
                    <span className="comment-date"><TimeAgo date={ comment.date_added } /></span>
                </CardText>
                <CardActions className="comment-actions text-align-right">
                    <CardActionsButton
                        title="Edit"
                        onTouchTap={ this.handleClick.bind(this, link) }
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.CardComment = CardComment
