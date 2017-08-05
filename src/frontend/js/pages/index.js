import React from 'react';
import { render } from 'react-dom';
import { 
    BrowserRouter as Router,
    Route,
    browserHistory
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import store from 'store/store';

// External
import Index from 'components/pages/index';
import Login from 'components/pages/login';

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
console.log(Index);
console.log(Login);
render((
    <Provider store={ store }>
        <Router history={ browserHistory } onUpdate={ logPageView }>
            <div>
                <Route path="/" component={ Index } props={ { securityContext } } />
                <Route path="/login" component={ Login } props={ { securityContext } } />
            </div>
        </Router>
    </Provider>
), document.getElementById('mount'));
