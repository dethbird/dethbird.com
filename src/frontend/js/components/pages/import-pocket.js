import React from 'react';
import request from 'superagent';
import classNames from 'classnames';
import pluralize from 'pluralize';
import { browserHistory, Link } from 'react-router';

import PocketArticleCard from '../layout/card/pocket-article-card';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_REQUESTING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

const ImportPocket = React.createClass({
    getInitialState: function() {
        return (
            {
                selectedUrls: [],
                uiState: UI_STATE_COMPLETE
            }
        );
    },
    handleSubmit: function() {
        const { selectedUrls } = this.state;
        const that = this;
        that.setState( {
            uiState: UI_STATE_REQUESTING
        });

        request.post('/api/content/articles')
            .send( selectedUrls )
            .end(function(err, res){
                that.setState( {
                    selectedUrls: [],
                    uiState: UI_STATE_COMPLETE
                });
                if(res.ok) {
                    window.location.href = '/';
                } else {
                    console.log(res);
                }
        });
    },
    handleCheckArticle: function(event, checked){
        const { selectedUrls } = this.state;
        const { value } = event.target;
        const index = _.indexOf(selectedUrls, value);

        if (checked && index < 0)
            selectedUrls.push(value);

        if(!checked && index >= 0)
            selectedUrls.splice(index, 1)

        this.setState({
            ...this.state,
            selectedUrls
        });
    },
    render() {
        const { selectedUrls, uiState } = this.state;
        const { handleCheckArticle } = this;

        let articles = [];
        _.mapObject(pocketResponse.list, function(article, i) {
            articles.unshift(article);
        });

        const articleNodes = articles.map(function(article, i){
            return (
                <div className="column is-3"  key={ article.item_id }>
                    <PocketArticleCard article={ article }  onCheckArticle={ handleCheckArticle } sequence={ i } />
                </div>
            );
        });

        return (
            <div>
                <div className="content">
                    <a
                        className={classNames([
                            'button id-large is-primary',
                            selectedUrls.length==0 ? 'is-disabled' : null,
                            uiState==UI_STATE_REQUESTING ? 'is-loading': null
                        ])}
                        onClick={ this.handleSubmit }
                    >
                        <span>import { selectedUrls.length } { pluralize('url',selectedUrls.length ) }</span>
                    </a>
                </div>
                <div className="columns is-multiline">
                    { articleNodes }
                </div>
            </div>
        );
    }
});

export default ImportPocket;
