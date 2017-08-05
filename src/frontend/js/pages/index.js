import React, { Component } from 'react';
import { render } from 'react-dom';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { Layout } from 'react-toolbox';

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

const history = createBrowserHistory();

if (lastRequestUri !== '/favicon.ico') {
    history.push(lastRequestUri);
}

function requireAuth(securityContext, WrappedComponent) {
    return class extends Component {
        componentWillMount() {
            if (securityContext.id === 0) {
                document.location = '/login';
            }
        }
        render() {
            if (securityContext.id === 0) {
                return null;
            } else {
                return <WrappedComponent { ... this.props } />
            }
        }
    }
}

const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

render((
    <Provider store={ store }>
        <Router history={ history } onUpdate={ logPageView }>
            <Layout>
                <Route path="/login" component={ Login } props={{ securityContext }} />
                <Route exact path="/" component={requireAuth(securityContext, Index)} props={{ securityContext }} />
            </Layout>
        </Router>
    </Provider>
), document.getElementById('mount'));
