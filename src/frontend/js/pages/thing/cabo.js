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

import Thing from 'components/pages/thing';

if (lastRequestUri !== '/favicon.ico') {
    history.replace(lastRequestUri);
}

render((
    <Router history={history}>
        <Provider store={store}>
            <div>
                <Route 
                    path="*"
                    component={ Thing }
                />
            </div>
        </Provider>
    </Router>
), document.getElementById('mount'));
