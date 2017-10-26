import React, { Component } from 'react';
import { connect } from 'react-redux';

import urlParse from 'url-parse';
import moment from 'moment';

import { forOwn, sortBy } from 'lodash';

/** Material UI */
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { UI_STATE } from 'constants/ui-state';
import { getAllArticles } from 'actions/pocket';

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

class PocketList extends Component {
    constructor(props) {
        super(props);
        this.renderArticles = this.renderArticles.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getAllArticles());
    }
    renderArticles() {
        const { data } = this.props;
        if (!data)
            return null;

        let list = [];
        forOwn(data.list, function (item, i) { 
            list.push(item);
            return item; 
        });
        list = sortBy(list, ['time_added']).reverse();
        const nodes = list.map(function (item, i) {
            const url = urlParse(item.resolved_url);
            const timestamp = moment.unix(item.time_added);
            return (
                <ListItem
                    key={i}
                    children={
                        <div className='item row' key={i}>
                            <div className='col-xs-12 col-sm-4'>
                                <img className='item_prop item_image' src={item.image ? item.image.src : 'https://renderman.pixar.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'} />
                            </div>
                            <div className='col-xs-12 col-sm-7'>
                                <h3 className='item_prop item_title'>{item.resolved_title}</h3>
                                <h5 className='item_prop item_subtitle subdued'>{url.origin}</h5>
                                <div className='item_prop item_date'>{timestamp.format('YYYY-MM-DD')}</div>
                            </div>
                        </div>

                    }
                />
            );
        });
        return nodes;
    }
    render() {
        const { ui_state } = this.props;
        return (
            <UiStateContainer uiState={ui_state} >
                <List>
                    {this.renderArticles()}
                </List>
            </UiStateContainer>
        );
    }
};

const mapStateToProps = (state) => {
    const { ui_state, data } = state.pocketReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        data
    }
}

export default connect(mapStateToProps)(PocketList);
