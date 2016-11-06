import classNames from 'classnames';
import React from 'react'
import { connect } from 'react-redux'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

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

import { getFlickrs, resetFlickrs } from  '../../actions/flickr-selector'

const FlickrSelector = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },
    handleClickOpen: function() {
        const { dispatch } = this.props;
        dispatch(getFlickrs());
    },
    handleClickSelect: function(url) {
        const { dispatch } = this.props;
        this.props.onClick(url);
        dispatch(resetFlickrs());
    },
    render: function() {
        const { flickr_selector_state, flickrs } = this.props;
        const that = this;

        if (flickrs) {

            const flickrImageNodes = flickrs.map(function(image) {
                return (
                    <GridTile
                        key={ image.id }
                        title={ image.title }
                        actionIcon={<IconButton onClick={ that.handleClickSelect.bind(that, image.url_l ) }><ContentAddCircle color="white" /></IconButton>}
                    >
                        <img
                            src={ image.url_l }
                        />
                    </GridTile>
                );
            });

            return (
                <div>
                    <UiState state={ flickr_selector_state } />
                        <GridList
                            cols={ 4 }
                            cellHeight= { 350 }
                        >
                            <Subheader>Select a FLickr image:</Subheader>
                            { flickrImageNodes }
                        </GridList>
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
                    secondary={ true }
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
