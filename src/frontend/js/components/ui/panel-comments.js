import React, { Component } from 'react';
import classNames from 'classnames';
import { List, ListItem } from 'material-ui/List';

import PanelCommentInline from 'components/form/panel-comment-inline';


class PanelComments extends Component {
    render() {
        const { panel, securityContext } = this.props;
        if (panel.comments.length < 1)
            return (
                <div>
                    <div style={{textAlign: 'center'}}>No Comments</div>
                    <List>
                        <ListItem><PanelCommentInline comment={ null } /></ListItem>
                    </List>
                </div>
            );
            
        const nodes = panel.comments.map(function(comment,i){
            return (
                <ListItem key={i} className={classNames(['comment', comment.status])}>
                    <PanelCommentInline comment={comment} />
                </ListItem>
            );
        });
        nodes.push(<ListItem key={nodes.length + 1}><PanelCommentInline comment={ null } /></ListItem>);
        return (
            <List>{nodes}</List>
        )
    }
};

export default PanelComments;
