import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import classNames from 'classnames';

const ImageWithPreview = React.createClass({

    getInitialState: function() {
        return {
            modalOpen: false
        }
    },
    propTypes: {
        src: React.PropTypes.string,
        title: React.PropTypes.string,
        className: React.PropTypes.string
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
        const { src, title, className } = this.props;
        const { modalOpen } = this.state;

        const actions = [
            <FlatButton
                label="Close"
                primary={ true }
                onTouchTap={ this.handleClose }
            />
        ];

        return (
            <div className={ classNames([className, 'image-with-preview']) }>
                <img
                    className="image modal-trigger"
                    src={ src ? src : 'https://c1.staticflickr.com/9/8185/29446313350_0a95598297_b.jpg' }
                    onTouchTap={ this.handleOpen }
                />
                <Dialog
                    title={ title }
                    actions={ actions }
                    modal={ true }
                    open={ modalOpen }
                    className='dialog'
                    bodyClassName='dialog-body'
                    contentClassName='dialog-content'
                    >
                    <img
                        className={ classNames(['image-dialog']) }
                        src={ src ? src : 'https://c1.staticflickr.com/9/8185/29446313350_0a95598297_b.jpg' }
                    />
                </Dialog>
            </div>
        );
    }
})

export default ImageWithPreview;
