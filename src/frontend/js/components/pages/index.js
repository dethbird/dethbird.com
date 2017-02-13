import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import request from 'superagent';

import ContentArticleCard from '../layout/card/content-article-card';
import UiState from '../ui/ui-state'

import {
    UI_STATE_REQUESTING,
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';
import { getContentArticles } from  '../../actions/content-articles';


const Index = React.createClass({
    getInitialState: function() {
        return (
            {
                selectedArticles: [],
                changedFields: {}
            }
        );
    },
    handleBulkAddTagClick() {
        const { dispatch } = this.props;
        const { changedFields, selectedArticles } = this.state;
        const that = this;

        that.setState( {
            uiState: UI_STATE_REQUESTING,
            selectedArticles: [],
            changedFields: {}
        });

        request.post('/api/tags/bulk-add/content-articles')
            .send( {
                tag: changedFields.bulkTag,
                article_ids: selectedArticles
            } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(getContentArticles());
                } else {
                    console.log(res);
                }
            });
    },
    handleFieldChange(event) {
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            ... this.state,
            changedFields: newChangedFields
        });
    },
    handleCheckArticle: function(event, checked){
        const { selectedArticles } = this.state;
        const { value } = event.target;
        const index = _.indexOf(selectedArticles, value);

        if (checked && index < 0)
            selectedArticles.push(value);

        if(!checked && index >= 0)
            selectedArticles.splice(index, 1)

        this.setState({
            ...this.state,
            selectedArticles
        });
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getContentArticles());
    },
    renderBulkControls() {
        const { selectedArticles, changedFields } = this.state;
        if (selectedArticles.length < 1)
            return null;

        return (
            <div className="content-article-bulk-controls">
                <div className="box">
                    <div className="control">
                        <span>With <strong>{ selectedArticles.length }</strong> selected:</span>
                    </div>
                    <div className="control has-addons">
                        <input type="text" className="input" id="bulkTag" value={ changedFields.bulkTag || '' } onChange={ this.handleFieldChange } placeholder="New tag"/>
                        <button className="button" onClick={ this.handleBulkAddTagClick }>Add Tag</button>
                    </div>
                </div>
            </div>
        );
    },
    render() {
        const { selectedArticles } = this.state;
        const { ui_state, articles } = this.props;
        const that = this;

        let articleNodes;
        if(!articles) {
            articleNodes = <UiState state={ ui_state } />
        } else {

            articleNodes = articles.map(function(article, i){
                return (
                    <div className="column is-2"  key={ article.id }>
                        <ContentArticleCard
                            article={ article }
                            securityContext={ securityContext }
                            renderNav={ true }
                            sequence={ i }
                            onCheckArticle={ that.handleCheckArticle }
                            checked={ selectedArticles.indexOf(`${article.id}`) > -1 }
                        />
                    </div>
                );
            });
        }

        return (
            <div>
                { this.renderBulkControls() }
                <div className="columns is-multiline">
                    { articleNodes }
                </div>
            </div>
        );
    }
})

const mapStateToProps = (state) => {

    const { ui_state, articles } = state.contentArticles;
    return {
        ... state,
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        articles
    }
    return state;
}

export default connect(mapStateToProps)(Index);
