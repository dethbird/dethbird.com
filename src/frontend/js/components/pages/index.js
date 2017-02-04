import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { StaggeredMotion, presets, spring } from 'react-motion';

// import AppHeader from '../layout/app-header';
import ContentArticleCard from '../layout/card/content-article-card';
import UiState from '../ui/ui-state'

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';
import { getContentArticles } from  '../../actions/content-articles';


const Index = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getContentArticles());
    },
    render() {
        const { ui_state, articles } = this.props;

        let articleNodes;
        if(!articles) {
            articleNodes = <UiState state={ ui_state } />
        } else {

            articleNodes = articles.map(function(article, i){
                return (
                    <div className="column is-3"  key={ article.id }>
                        <ContentArticleCard article={ article } securityContext={ securityContext } renderNav={ true }/>
                    </div>
                );
            });
        }

        return (
            <div className="columns is-multiline">
                { articleNodes }
            </div>
        );
    }
})

const mapStateToProps = (state) => {

    const { ui_state, articles } = state.contentArticles;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        articles
    }
    return state;
}

export default connect(mapStateToProps)(Index);
