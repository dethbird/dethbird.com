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

            const defaultStyles = articles.map(function(article, i) { return  { x: 1.3, s: 0 }; });

            articleNodes =  (
                <StaggeredMotion
                    defaultStyles={ defaultStyles }
                    styles={ prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                        return i === 0
                        ? { x : spring(1, {stiffness: 200, damping: 12}), s: spring(1) }
                        : { x : spring( prevInterpolatedStyles[i - 1].x, {stiffness: 200, damping: 12} ), s:  spring( prevInterpolatedStyles[i - 1].s) }
                    })}
                >
                    {interpolatingStyles =>
                        <div className="columns">
                            { interpolatingStyles.map((style, i) => {
                                    return (
                                        <div key={ articles[i].id } style={ { transform: `scale(${ style.x })`, opacity: style.s } }  className="column is-one-quarter" >
                                            <ContentArticleCard article={ articles[i] } securityContext={ securityContext } renderNav={ true } />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    }
                </StaggeredMotion>
            );
        }

        return articleNodes;
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
