import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from 'components/app';

// External
import Index from 'components/pages/index';
import Newsfeed from 'components/pages/newsfeed';
import Product from 'components/pages/product';

// Internal
import Dashboard from 'components/pages/dashboard';
import CharacterEdit from 'components/pages/character-edit';
import Characters from 'components/pages/characters';
import StoryEdit from 'components/pages/story-edit';
import StoryEditDemo from 'components/pages/story-edit-demo';
import StoryPlay from 'components/pages/story-play';
import StoryPlayDemo from 'components/pages/story-play-demo';
import Stories from 'components/pages/stories';
import store from 'store/store';


if (lastRequestUri !== '/favicon.ico') {
    browserHistory.replace(lastRequestUri);
}

const NoMatch = React.createClass({
    render() {
        return (
            <div>Whachhu talkin about?</div>
        );
    }
});

const requireAuth = (nextState, replace, callback) => {
    if (securityContext.application_user === 1) {
        replace('/');
    }
    return callback();
};

render((
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/" component={ App } props={ { securityContext } }>
                <IndexRoute component={ Index } props={ { securityContext } } />
                <Route path="newsfeed" component={ Newsfeed } props={ { securityContext } }/>
                <Route path="product" component={ Product } props={ { securityContext } }/>
                <Route path="product/demo/storyplayer" component={ StoryPlayDemo } props={ { securityContext } }/>
                <Route path="product/demo/storyeditor" component={ StoryEditDemo } props={ { securityContext } }/>
                <Route path="dashboard" component={ Dashboard } props={ { securityContext } } onEnter={ requireAuth }/>
                <Route path="characters" component={ Characters } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="character/create" component={ CharacterEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="character/:id/edit" component={ CharacterEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="stories" component={ Stories } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/create" component={ StoryEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/:id/edit" component={ StoryEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/:id/play" component={ StoryPlay } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="*" component={ Index } props={ { securityContext } } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
