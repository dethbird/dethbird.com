import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import App from 'components/app';
import store from 'store/store';

// External
import Index from 'components/pages/index';

// Google Analytics
ReactGA.initialize('UA-98286537-1', {
    titleCase: false,
    gaOptions: {
        userId: securityContext.id
    }
});

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

const requireAdmin = (nextState, replace, callback) => {
    if (securityContext.admin_user !== 1) {
        replace('/');
    }
    return callback();
};

const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

render((
    <Provider store={ store }>
        <Router history={browserHistory} onUpdate={ logPageView }>
            <Route path="/" component={ App } props={ { securityContext } }>
                <IndexRoute component={ Index } props={ { securityContext } } />
                <Route path="*" component={ Index } props={ { securityContext } } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
