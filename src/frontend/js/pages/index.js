import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { App } from '../components/app';
import ContentArticleEdit from '../components/pages/content-article-edit';
import Index from '../components/pages/index';
import Submit from '../components/pages/submit';
import store from '../store/store';

const NoMatch = React.createClass({
    render() {
        return (
            <div>Whachhu talkin about</div>
        );
    }
});

if (lastRequestUri) {
    browserHistory.push(lastRequestUri);
}

render((
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index } />
                <Route path="submit" component={ Submit } />
                <Route path="/content/article/add" component={ ContentArticleEdit } />
                <Route path="/content/article/:articleId/edit" component={ ContentArticleEdit } />
                <Route path="*" component={ Index } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
