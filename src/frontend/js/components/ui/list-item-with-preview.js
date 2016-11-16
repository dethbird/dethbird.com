import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';

import classNames from 'classnames';

const ListItemWithPreview = React.createClass({

    getInitialState: function() {
        return {
            modalOpen: false
        }
    },
    propTypes: {
        previewTitle: React.PropTypes.string,
        className: React.PropTypes.string,
        previewContent: React.PropTypes.any
    },

    handleOpen: function() {
        this.setState({
            modalOpen: true
        });
    },

    handleClose: function() {
        this.setState({
            modalOpen: false
        });
    },

    render: function() {
        const { previewContent, previewTitle, className } = this.props;
        const { modalOpen } = this.state;

        const actions = [
            <FlatButton
                label="Close"
                primary={ true }
                onTouchTap={ this.handleClose }
            />
        ];

        return (
            <ListItem className={ classNames([className, 'list-item-with-preview']) } onTouchTap={ this.handleOpen }>
                { this.props.children }
                <Dialog
                    title={ previewTitle }
                    actions={ actions }
                    modal={ true }
                    open={ modalOpen }
                    className='dialog'
                    bodyClassName='dialog-body'
                    contentClassName='dialog-content'
                    autoScrollBodyContent={ true }
                >
                    { previewContent }
                </Dialog>
            </ListItem>
        );
    }
})

export default ListItemWithPreview;
