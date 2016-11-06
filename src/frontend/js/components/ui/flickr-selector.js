import classNames from 'classnames';
import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import ActionPermMedia from 'material-ui/svg-icons/action/perm-media'

import { Card } from '../ui/card'
import { CardBlock } from '../ui/card-block'
import { CardClickable } from '../ui/card-clickable'
import { ImagePanelRevision } from '../ui/image-panel-revision'
import { Spinner } from '../ui/spinner'
import UiState from '../ui/ui-state'

import {
    FLICKR_SELECTOR_STATE_INITIALIZING,
    FLICKR_SELECTOR_STATE_COMPLETE,
} from '../../constants/ui-state';

import { getFlickrs } from  '../../actions/flickr-selector'

const FlickrSelector = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },
    handleClickOpen: function() {
        const { dispatch } = this.props;
        dispatch(getFlickrs());
    },
    handleClickSelect: function(event) {
        this.setState({
            status: 'init'
        });
        this.props.onClick(event);
    },
    render: function() {
        const { flickr_selector_state, flickrs } = this.props;
        const handleClickSelect = this.handleClickSelect;

        if (flickrs) {

            const flickrImageNodes = flickrs.map(function(image) {
                return (
                    <Card
                        className="col-lg-3"
                        key={ image.id }
                    >
                        <CardBlock>
                            <img
                                src={ image.url_l }
                                onClick={ handleClickSelect }
                            />
                        </CardBlock>
                    </Card>
                );
            });

            return (
                <div>
                    <UiState state={ flickr_selector_state } />
                    { flickrImageNodes }
                </div>
            )
        }

        return (
            <div className='flickr-selector'>
                <UiState state={ flickr_selector_state } />
                <RaisedButton
                    label="Select from Flickr"
                    onClick={ this.handleClickOpen }
                    icon={<ActionPermMedia />}
                />
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { flickr_selector_state, flickrs } = state.flickrSelector;
    return {
        flickr_selector_state: flickr_selector_state ? flickr_selector_state : FLICKR_SELECTOR_STATE_COMPLETE,
        flickrs
    }
}

export default connect(mapStateToProps)(FlickrSelector);
