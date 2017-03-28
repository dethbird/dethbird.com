import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from 'components/app';
import Index from 'components/pages/index';
import Dashboard from 'components/pages/dashboard';
import CharacterEdit from 'components/pages/character-edit';
import Characters from 'components/pages/characters';
import ScriptEdit from 'components/pages/script-edit';
import Scripts from 'components/pages/scripts';
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
                <Route path="dashboard" component={ Dashboard } props={ { securityContext } } onEnter={ requireAuth }/>
                <Route path="characters" component={ Characters } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="character/create" component={ CharacterEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="character/:id/edit" component={ CharacterEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="scripts" component={ Scripts } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="script/create" component={ ScriptEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="script/:id/edit" component={ ScriptEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="*" component={ Index } props={ { securityContext } } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
