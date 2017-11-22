import React, { Component } from 'react';
import { render } from 'react-dom';
import { 
    Router,
    Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import store from 'store/store';

import Index from 'components/pages/index';
import Thing from 'components/pages/thing';
import Login from 'components/pages/login';

if (lastRequestUri !== '/favicon.ico') {
    history.replace(lastRequestUri);
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
                return <WrappedComponent securityContext={ securityContext } { ...this.props } />
            }
        }
    }
};

render((
    <Router history={ history }>
        <Provider store={ store }>
            <div>
                <Route path="/login" component={ Login } props={{ securityContext }} />
                <Route exact path="/thing/:name" component={ Thing } />
                <Route exact path="/" component={requireAuth(securityContext, Index)} props={{ securityContext }} />
            </div>
        </Provider>
    </Router>
), document.getElementById('mount'));
