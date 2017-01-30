import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
// import {CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import AppHeader from '../layout/app-header';
import ContentArticleCard from '../layout/card/content-article-card';
// import { Card } from '../ui/card'
// import { CardBlock } from '../ui/card-block'
// import { Description } from '../ui/description'
// import { FountainFull } from '../ui/fountain-full'
// import { Image } from "../ui/image"
// import { HeaderPage } from "../ui/header-page"
// import { HeaderPageButton } from "../ui/header-page-button"
// import { SectionHeader } from '../ui/section-header'
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
            articleNodes =  articles.map(function(article) {
                return (
                    <div className="column is-one-third" key={ article.id }>
                        <ContentArticleCard article={ article } />
                    </div>
                );
            });
        }

        return (
            <div className="app">
                <div className="app-header">
                    <AppHeader title="Lameness Reduction Party"/>
                </div>
                <div className="app-body">
                    <div className="columns">
                        { articleNodes }
                    </div>
                </div>
                <div className="app-footer">footer</div>
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
