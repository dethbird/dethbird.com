import React, { Component } from 'react';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';
import ReactMarkdown from 'react-markdown';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';


class PanelComments extends Component {
    render() {
        const { panel } = this.props;
        if (panel.comments.length < 1)
            return <div>No Comments</div>;
        const nodes = panel.comments.map(function(comment,i){
            return (
                <ListItem key={i} className={classNames(['comment', comment.status])}>
                    <Paper zDepth={1} style={ {padding: 15}}>
                        <ReactMarkdown source={comment.comment || ''} />
                        <div style={{ textAlign: 'right' }} className="username">{comment.user.username}</div>
                        <div style={{ textAlign: 'right' }} className="timestamp"><TimeAgo date={comment.date_added} /></div>
                    </Paper>
                </ListItem>
            );
        });
        return (
            <List>{nodes}</List>
        )
    }
};

export default PanelComments;
