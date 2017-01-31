import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { StaggeredMotion, presets, spring } from 'react-motion';

import AppHeader from '../layout/app-header';
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

            const defaultStyles = articles.map(function(article, i) { return  { x: 1.3 }; });

            articleNodes =  (
                <StaggeredMotion
                    defaultStyles={ defaultStyles }
                    styles={ prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                        return i === 0
                        ? { x : spring(1, {stiffness: 200, damping: 12}) }
                        : { x : spring( prevInterpolatedStyles[i - 1].x, {stiffness: 200, damping: 12} ) }
                    })}
                >
                    {interpolatingStyles =>
                        <div className="columns">
                            { interpolatingStyles.map((style, i) => {
                                    return (
                                        <div key={ articles[i].id } style={ { transform: `scale(${ style.x })` } }  className="column is-one-quarter" >
                                            <ContentArticleCard article={ articles[i] } />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    }
                </StaggeredMotion>
            );

            const oldarticleNodes =  articles.map(function(article, i) {
                return (
                    <div className="column is-one-quarter" key={ article.id }>
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
                    { articleNodes }
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
