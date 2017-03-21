import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from 'components/app';
import Index from 'components/pages/index';
import Login from 'components/pages/login';
import store from 'store/store';

const NoMatch = React.createClass({
    render() {
        return (
            <div>Whachhu talkin about</div>
        );
    }
});

if (lastRequestUri !== '/favicon.ico') {
    browserHistory.push(lastRequestUri);
}

render((
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/" component={ App } props={ { securityContext } }>
                <IndexRoute component={ Index } props={ { securityContext } } />
                <Route path="/login" component={ Login } props={ { securityContext } } />
                <Route path="*" component={ Index } props={ { securityContext } } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
